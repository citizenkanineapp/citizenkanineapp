const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// ADMIN ONLY:
// /daily for generating daily dogs
// /routes for GETTING all of the available dogs for the day in their default routes
// PUT to /routes to change dog routes
// expects an object with {dog_id, route_id}

// EVERYONE:
// /route/:route_id for GETTING specific route / dog info
// /dog/:id for GETTING a specific dogs details


// FUNCTIONS SHARED BY ROUTES
// getDailyDogsSearchQuery generates search query that is used by both /mobile/daily and /mobile/checkDogsSchedule endpoints
const getDailyDogsSearchQuery = (day) => {

    const weekdayNumber = day.getDay();
    // SQL to grab dogs scheduled for given weekday
    let searchQuery;
    if ( weekdayNumber === 0 || weekdayNumber === 6) {
        console.log('hi')
        searchQuery = `SELECT NULL AS dogs;`;
    } else {
        searchQuery = `
        SELECT clients_schedule.id,
            clients_schedule."1" AS Monday ,    
            clients_schedule."2" AS Tuesday,
            clients_schedule."3" AS Wednesday,
            clients_schedule."4" AS Thursday, 
            clients_schedule."5" AS Friday,
            dogs.client_id,
            clients.route_id,
            clients.first_name,
            clients.last_name, 
            dogs."name",
            routes."name" AS route_name,
            dogs.id AS dog_id
        FROM clients_schedule
            JOIN "dogs" ON clients_schedule.client_id = dogs.client_id
            JOIN "clients" ON clients_schedule.client_id = clients.id
            JOIN "routes" ON clients.route_id = routes.id
        WHERE 
            "${weekdayNumber}" = TRUE
            AND dogs.active = TRUE
            AND dogs.regular = TRUE    
        ORDER BY
            route_id,
            client_id;
        `;
    }
    
        
        // SQL to grab schedule adjustments table
    const scheduleQuery = `
    SELECT dogs_schedule_changes.*, dogs.name, clients.route_id from dogs_schedule_changes
        JOIN dogs ON dogs_schedule_changes.dog_id = dogs.id
        JOIN clients ON dogs.client_id = clients.id
        WHERE dogs_schedule_changes.date_to_change = $1
    ORDER BY dogs_schedule_changes.dog_id;
    `;

    return [searchQuery, scheduleQuery];
}

// getAdjustedSchedule is used by both /mobile/daily and /mobile/checkDogsSchedule endpoints
const getAdjustedSchedule = (scheduledDogs, scheduleAdjustments) => {
    // taking out the dog_id's from the cancellations to quickly find the dogs that need to be removed.
    const cancellations = scheduleAdjustments
        .filter(item => item.is_scheduled === false)
        .map(item => item.dog_id);
    // adjustedDogs is the original dog array MINUS the canceled dogs for the day. there is a possibility for duplicate values to end up in additions!
    const adjustedDogs = scheduledDogs.filter(item => !cancellations.includes(item.dog_id));
    // here are the dogs that were added for the day that typically might not be scheduled
    const additions = scheduleAdjustments.filter(item => item.is_scheduled === true);
    // returns TRUE if id matches dog.dog_id in adjustedDogs
    const checkDogId = (id, array) => {
        return array.some(dog => dog.dog_id === id);
    }
    for (let item of additions) {
        if (!checkDogId(item.dog_id,adjustedDogs)) {
            adjustedDogs.push(item);
        }
    }
    return adjustedDogs;
}

// GET ROUTE FOR DAILY DOGS SCHEDULE

router.get('/daily', async (req, res) => {
    const client = await pool.connect();

    // hit the route
    // logic to populate daily dogs if there is nothing for the day?
    const today = new Date()
    today.setUTCHours(today.getUTCHours() - 5)
    console.log('server time is', new Date().toString())
    console.log('client time is',today)

    const [ searchQuery, scheduleQuery ] = getDailyDogsSearchQuery(today);
    // console.log(searchQuery, scheduleQuery)

    try {
        await client.query('BEGIN');

        // find the dogs default scheduled for the day
        const scheduledDogsResponse = await client.query(searchQuery);
        const scheduledDogs = scheduledDogsResponse.rows;
        // console.log(scheduledDogs);
        // scheduled dogs is an array of objects - of the dogs originally scheduled for the day.

        // find the schedule changes for the day
        const scheduleAdjustmentsResults = await client.query(scheduleQuery,[today]);
        const scheduleAdjustments = scheduleAdjustmentsResults.rows;
        // console.log(scheduleAdjustments);

        // if there are no changes - add original array to daily_dogs
        if (scheduleAdjustments.length < 1) {
            console.log('Good to Go no adjustments!');
            // insert into daily_dogs
            // console.log(scheduledDogs);
            await Promise.all(scheduledDogs.map(dog => {
                const insertQuery = `INSERT INTO daily_dogs ("dog_id", "route_id", "client_id", "name") VALUES ($1, $2, $3, $4);`;
                const insertValues = [dog.dog_id, dog.route_id, dog.client_id, dog.name];
                return client.query(insertQuery, insertValues);
            }));

            await client.query('COMMIT');
            console.log('daily dogs committed');
            res.send({ scheduledDogs });
        } else {

           const adjustedDogs = getAdjustedSchedule(scheduledDogs, scheduleAdjustments);

            console.log('Good to Go with adjustments!');
            // insert into daily_dogs
            await Promise.all(adjustedDogs.map(dog => {
                const insertQuery = `INSERT INTO daily_dogs ("dog_id", "route_id", "client_id", "name", "date") VALUES ($1, $2, $3, $4, $5)`;
                const insertValues = [dog.dog_id, dog.route_id, dog.client_id, dog.name, today];
                return client.query(insertQuery, insertValues);
            }));

            await client.query('COMMIT');
            console.log('daily dogs committed');
            res.send({ adjustedDogs });

        }
    } catch (error) {
        await client.query('ROLLBACK')
        // alert('Error Getting Daily Dogs - Could be due to attempted duplicate entries.')
        console.log('Error in Generating / Getting Daily Dogs', error.detail);
        res.sendStatus(500);
    } finally {
        client.release();
    }
});

// router returns number of dogs scheduled for given day
router.get('/checkDogSchedule/:date', async (req, res) => {
    console.log('in /checkDogSchedule', req.params.date)
    const client = await pool.connect();
    const date = new Date(req.params.date);
    // console.log('date is', date);
    const [ searchQuery, scheduleQuery ] = getDailyDogsSearchQuery(date);

    // fillScheduled organizes query response by client.
    const fillScheduled = (dogArray) => {
        let dogList = dogArray.map(dog => ({
            dog_id: dog.dog_id,
            client_id: dog.client_id,
            name: dog.name,
            id: dog.id,
            route_id: dog.route_id,
            client_first_name: dog.first_name,
            client_last_name: dog.last_name,
            route_name: dog.route_name
        }));
        
        let idArray = dogArray.map(dog => dog.client_id);

        //this filters out duplicate IDs
        let uniqueIds = [...new Set(idArray)]

        //this groups result.rows by id
        const group = dogList.reduce((acc, item) => {
            // console.log(acc)
            if (!acc[item.client_id]) {
                acc[item.client_id] = [];
            }
            acc[item.client_id].push(item);
            return acc;
        }, {})

        let clients = uniqueIds.map(clientId => {
            let dogsForClient = group[clientId];
        
            const { client_last_name, client_first_name, route_id, route_name } = dogsForClient[0];
            const client = { client_last_name, client_first_name, client_id: clientId, route_id, route_name };
        
            client.dogs = dogsForClient.map(({ name, id }) => ({ name, id }));
            
            return client;
        });
        return clients;
    }
    
    try {
        // scheduled dogs is an array of objects - of the dogs originally scheduled for the day.
        // find the dogs default scheduled for the day
        const scheduledDogsResponse = await client.query(searchQuery);

        const scheduledDogs = scheduledDogsResponse.rows;
    
        // find the schedule changes for the day
        const scheduleAdjustmentsResponse = await client.query(scheduleQuery,[date]);
        const scheduleAdjustments = scheduleAdjustmentsResponse.rows;

        if (scheduleAdjustments < 1 ) {
            const dogsScheduledForDay = fillScheduled(scheduledDogs);
            // console.log(dogsScheduledForDay[0].dogs)
            res.send({dogsScheduledForDay});
        } else {
            const adjustedDogs = getAdjustedSchedule(scheduledDogs,scheduleAdjustments)
            dogsScheduledForDay = fillScheduled(adjustedDogs);
            res.send({dogsScheduledForDay});
        }
    } catch (error) {
        console.log('error checking scheduled dogs', error.detail);
        res.sendStatus(500);
    } finally {
        console.log('release')
        client.release();
    }
});

// GET ROUTE FOR EMPLOYEE ROUTES
router.get('/route/:route_id', async (req, res) => {
    const today = new Date()
    today.setUTCHours(today.getUTCHours() - 5)
    let route = req.params.route_id;

    // routes need to be arrays of dog objects ...
    // do we want separate arrays per route?
    const routeQuery = `
    SELECT daily_dogs.*, dogs.flag, dogs.notes AS dog_notes, dogs.image, routes.name AS route, clients.id, concat_ws(' ', clients.first_name, clients.last_name) AS client_name, clients.notes AS client_protocol, clients.lat, clients.long, clients.street, clients.zip from daily_dogs
	JOIN dogs
		ON daily_dogs.dog_id = dogs.id
	JOIN routes
		ON daily_dogs.route_id = routes.id
	JOIN clients
		ON daily_dogs.client_id = clients.id
	    WHERE daily_dogs.date = $2 AND daily_dogs.route_id = $1
	ORDER BY daily_dogs.index;
    `

    const routeValue = [route, today];

    pool.query(routeQuery, routeValue)
        .then(routeResponse => {
            // console.log(routeResponse.rows);
            let routeArray = routeResponse.rows;


            res.send(routeResponse.rows);
        }).catch((error => {
            console.log('/route/:id GET error:', error);
        }));
});

router.get('/routes', async (req, res) => {
    const today = new Date()
    today.setUTCHours(today.getUTCHours() - 5)
    const routesQuery = `
    SELECT daily_dogs.*, dogs.flag, dogs.notes, dogs.image, routes.name AS route, clients.lat, clients.long, clients.street, clients.zip from daily_dogs
	JOIN dogs
		ON daily_dogs.dog_id = dogs.id
	JOIN routes
		ON daily_dogs.route_id = routes.id
    JOIN clients
        ON daily_dogs.client_id = clients.id
	WHERE daily_dogs.date = $1
    ORDER BY daily_dogs.index;
    `

    pool.query(routesQuery,[today])
        .then(allRoutesRes => {
            let dailyRoutes = allRoutesRes.rows;
            // console.log('daily routes test', dailyRoutes)
            res.send(dailyRoutes);
        }).catch((error => {
            console.log('/routes error getting all daily routes:', error);
        }));
})


router.get('/dog/:dogID', async (req, res) => {
    console.log('MADE IT TO DOG DETAILS ROUTE');
    const dogID = req.params.dogID;

    const dogDetailsQuery = `
    SELECT dogs.*, dogs.notes AS dog_notes, dogs.id AS dog_id, clients.*, clients_schedule."1" AS mon, clients_schedule."2" AS tue, clients_schedule."3" AS wed, clients_schedule."4" AS thu, clients_schedule."5" AS fri, clients.notes AS client_protocol from dogs
	    JOIN clients
		    ON dogs.client_id = clients.id
        JOIN clients_schedule
            ON dogs.client_id = clients_schedule.client_id
	    WHERE dogs.id = $1;
    `
    const dogDetailsValue = [dogID];

    pool.query(dogDetailsQuery, dogDetailsValue)
        .then(detailsResults => {
            const dogDetails = detailsResults.rows[0];
            // console.log(dogDetails)
            res.send(dogDetails);
        }).catch((error => {
            console.log('/dog/:id error getting dog details:', error);
        }));
})


router.put('/routes', async (req, res) => {
    const today = new Date()
    today.setUTCHours(today.getUTCHours() - 5)
    // expect an object being sent over for the put request?
    // pull out relevant dog ID and route ID
    const dogID = req.body.dogID;
    const routeID = req.body.routeID;

    console.log('DOG ID & ROUTE ID', dogID, routeID);

    const updateQuery = `UPDATE daily_dogs SET "route_id" = $1 WHERE "dog_id" = $2 AND daily_dogs.date = $3`;
    const updateValues = [routeID, dogID, today];

    pool.query(updateQuery, updateValues)
        .then(changeResults => {
            res.sendStatus(200);
        }).catch((error => {
            console.log('/dog/:id error getting dog details:', error);
        }));

})

// UPDATE A DOG's STATUS
router.put('/daily', async (req, res) => {
    const today = new Date()
    today.setUTCHours(today.getUTCHours() - 5)
    // expect an object being sent over for the put request?
    // pull out relevant dog ID and route ID
    const dogID = req.body.id;
    const checkedIn = req.body.checked_in;
    const noShow = req.body.no_show;
    const cancelled = req.body.cancelled;

    // console.log('UPDATED DOG', dogID, checkedIn, noShow, cancelled);

    const updateQuery = `UPDATE daily_dogs SET "checked_in" = $1, "no_show" = $2, "cancelled" = $3 WHERE "dog_id" = $4 AND daily_dogs.date = $5`;
    const updateValues = [checkedIn, noShow, cancelled, dogID, today];

    pool.query(updateQuery, updateValues)
        .then(changeResults => {
            res.sendStatus(200);
        }).catch((error => {
            console.log('/dog/:id error getting dog details:', error);
        }));

})

// UPDATE A DOG's NOTE
router.put('/notes', async (req, res) => {
    // expect an object being sent over for the put request?
    // pull out relevant dog ID and note
    const dogID = req.body.id;
    const note = req.body.note;

    // console.log('UPDATED DOG', dogID, note);

    const updateQuery = `UPDATE dogs SET "notes" = $2 WHERE "id" = $1`;
    const updateValues = [dogID, note];

    pool.query(updateQuery, updateValues)
        .then(changeResults => {
            res.sendStatus(200);
        }).catch((error => {
            console.log('/dog/:id error getting dog details:', error);
        }));

})

// UPDATE A DOG's PHOTO
router.put('/photos', async (req, res) => {
    // expect an object being sent over for the put request?
    // pull out relevant dog ID and note
    console.log('REQ BODY IS:', req.body);
    const dogID = req.body.dogID;
    const photo = req.body.data;

    // console.log('UPDATED DOG', dogID, photo);

    const updateQuery = `UPDATE dogs SET "image" = $2 WHERE "id" = $1`;
    const updateValues = [dogID, photo];

    pool.query(updateQuery, updateValues)
        .then(changeResults => {
            res.sendStatus(200);
        }).catch((error => {
            console.log('/dog/:id error getting dog details:', error);
        }));

})


// PUT ROUTE TO UPDATE DOG INDICES IN DAILY DOG FOR ROUTE REORDERING
router.put('/allDogs', async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN')

        await Promise.all(req.body.map(dog => {
            const updateQuery = `UPDATE daily_dogs SET "index" = $1 WHERE "dog_id" = $2 AND "date" = $3` ;
            const updateValues = [dog.index, dog.dog_id, dog.date];
            return client.query(updateQuery, updateValues);
        }));

        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST /api/order', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
});

module.exports = router;
