const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');


// GET ROUTE FOR DAILY DOGS SCHEDULE
router.get('/dogs', async (req, res) => {
    const client = await pool.connect();

    // hit the route
    // logic to populate daily dogs if there is nothing for the day?
    var today = new Date()
    var weekday = {};
    weekday.number = today.getDay();
    console.log('NUMBER IS:', weekday.number);
    // weekday = "Saturday"

    // the switch below this adds the necessary last two lines of the SQL Query to be Run
    // thus only grabbing dogs with the given day status 
    let searchQuery = `
    SELECT clients_schedule.id, clients_schedule."1" AS Monday,  clients_schedule."2" AS Tuesday,  clients_schedule."3" AS Wednesday,  clients_schedule."4" AS Thursday,  clients_schedule."5" AS Friday, dogs.client_id, clients.route_id, dogs.name, dogs.id AS dog_id from clients_schedule
        JOIN "dogs" ON clients_schedule.client_id = dogs.client_id
        JOIN "clients" ON clients_schedule.client_id = clients.id
    `

    switch (weekday.number) {
        case 1:
            console.log('Monday');
            searchQuery += 'WHERE "1" = TRUE ORDER BY route_id;';
            break;
        case 2:
            console.log('Tuesday');
            searchQuery += 'WHERE "2" = TRUE ORDER BY route_id;';
            break;
        case 3:
            console.log('Wednesday');
            searchQuery += 'WHERE "3" = TRUE ORDER BY route_id;';
            break;
        case 4:
            console.log('Thursday');
            searchQuery += 'WHERE "4" = TRUE ORDER BY route_id;';
            break;
        case 5:
            console.log('Friday');
            searchQuery += 'WHERE "5" = TRUE ORDER BY route_id;';
            break;
    }

    // SQL to grab schedule adjustments table
    const scheduleQuery = `
    SELECT dogs_schedule_changes.*, dogs.name from dogs_schedule_changes
		JOIN dogs ON dogs_schedule_changes.dog_id = dogs.id
	    WHERE dogs_schedule_changes.date_to_change = CURRENT_DATE
	ORDER BY dogs_schedule_changes.dog_id;
    `

    try {
        await client.query('BEGIN');

        // const dailyDogs = adjustedDogs.map(dog => {
        //     final = {
        //         name: dog.name,
        //         dog_id: dog.dog_id,
        //         client_id: dog.client_id,
        //         route_id: dog.route_id
        //     };
        // })
        // add client ID 
        const insertSQL = `
        INSERT INTO daily_dogs
            ("dog_id", "route_id")
        VALUES
            ($1, $2);
        `

        // find the dogs default scheduled for the day
        const scheduledDogsResponse = await client.query(searchQuery);
        const scheduledDogs = scheduledDogsResponse.rows;
        console.log(scheduledDogs);
        // scheduled dogs is an array of objects - of the dogs originally scheduled for the day.

        // find the schedule changes for the day
        const scheduleAdjustmentsResults = await client.query(scheduleQuery);
        const scheduleAdjustments = scheduleAdjustmentsResults.rows;
        console.log(scheduleAdjustments);

        // if there are no changes - add original array to daily_dogs
        if (scheduleAdjustments.length < 1) {
            console.log('Good to Go!');
            // insert into daily_dogs
            await Promise.all(scheduledDogs.map(dog => {
                const insertQuery = `INSERT INTO daily_dogs ("dog_id", "route_id", "client_id") VALUES ($1, $2, $3)`;
                const insertValues = [dog.dog_id, dog.route_id, dog.client_id];
                return client.query(insertQuery, insertValues);
            }));

            await client.query('COMMIT')
            res.send({ scheduledDogs });
        } else {

            // taking out the dog_id's from the cancellations to quickly find the dogs that need to be removed.
            const cancellations = scheduleAdjustments
                .filter(item => item.is_scheduled === false)
                .map(item => item.dog_id);

            // adjusted dogs is the original dog array MINUS the canceled dogs for the day
            const adjustedDogs = scheduledDogs.filter(item => !cancellations.includes(item.dog_id));

            // here are the dogs that were added for the day that typically might not be scheduled
            const additions = scheduleAdjustments.filter(item => item.is_scheduled === true);

            for (let item of additions) {
                // hard code route to be 'unassigned'
                item.route_id = 5;
                adjustedDogs.push(item);
            }

            console.log('Good to Go!');
            // insert into daily_dogs
            await Promise.all(adjustedDogs.map(dog => {
                const insertQuery = `INSERT INTO daily_dogs ("dog_id", "route_id", "client_id", "name") VALUES ($1, $2, $3, $4)`;
                const insertValues = [dog.dog_id, dog.route_id, dog.client_id, dog.name];
                return client.query(insertQuery, insertValues);
            }));

            await client.query('COMMIT')
            res.send({ adjustedDogs });

        }
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST /api/order', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }


    // pool.query(searchQuery)
    //     .then(response => {
    //         // loop through the response checking for schedule changes?
    //         console.log(response.rows);
    //         res.send(response.rows);
    //     })
    //     .catch(error => {
    //         console.log('ERROR IN GETTING DAILY DOGS:', error);
    //         res.sendStatus(500);
    //     })



    // not sure exactly what our request body is going to look like
    // BUT this is generally what the request should look like? 
    // maybe the 'current date' gets replaced with a PG variable?
    // results are sorted by route ID which hopefully makes things easier?

    // OTHERWISE if we need stuff separated on the server side here ... we can probably add route ID to the where statement
    // const sqlQuery = `
    // SELECT daily_dogs.*, dogs.name, dogs.client_id, dogs.flag, routes.name AS route_name    from "daily_dogs"
    //     JOIN "routes" ON daily_dogs.route_id = routes.id
    //     JOIN "dogs" ON daily_dogs.dog_id = dogs.id
    //     JOIN "clients" ON dogs.client_id = clients.id
    // WHERE daily_dogs.date = CURRENT_DATE
    // ORDER BY daily_dogs.route_id;
    // `

    // pool.query(sqlQuery)
    //     .then(response => {
    //         res.send(response.rows);
    //     })
    //     .catch(error => {
    //         console.log('ERROR IN GETTING DAILY DOGS:', error);
    //         res.sendStatus(500);
    //     })
    // GET route code here
});



// POST ROUTE FOR DAILY DOGS?
router.post('/', rejectUnauthenticated, (req, res) => {
    // takes in an array of objects from a reducer
    // needs to insert per line item into the daily_dogs table




    const insertSQL = `
    INSERT INTO daily_dogs
        ("dog_id", "route_id")
    VALUES
        ($1, $2);
    `
});



// PUT ROUTE TO UPDATE DOG ROUTES FOR THE DAY
// if it's a put per move it's this:
router.put('/', async (req, res) => {
    const client = await pool.connect();

    // what is the req.body?
    console.log(req.body);

    // example SQL query for an update ... this would only be for one dog, and would have two separate values we change
    // in the route_id and the dog_id ... i figured the dog_id is more easily accessible than the actual table row key

    // Need to look into a DB connection promises thing
    // const sqlQuery = `
    // UPDATE daily_dogs
    // SET 
    // 	"route_id" = 3
    // WHERE "dog_id" = 3;
    // `

    // TAKES IN AN ARRAY THAT LOOKS LIKE THIS
    //    {
    //     "dogs": [
    //         {
    //             "dog_id":3,
    //             "route_id":2
    //         },
    //          {
    //             "dog_id":5,
    //             "route_id":2
    //         },
    //         {
    //             "dog_id":18,
    //             "route_id":2
    //         }
    //     ]
    //     }

    try {
        // expect req.body to be an array of dogs 
        // inner objects should be {dog_id: #, route_id: #}
        const dogs = req.body.dogs;

        await client.query('BEGIN')

        await Promise.all(dogs.map(dog => {
            const updateQuery = `UPDATE daily_dogs SET "route_id" = $1 WHERE "dog_id" = $2`;
            const updateValues = [dog.route_id, dog.dog_id];
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
