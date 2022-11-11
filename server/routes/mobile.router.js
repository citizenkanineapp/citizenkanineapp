const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');


// GET ROUTE FOR DAILY DOGS SCHEDULE
router.get('/', (req, res) => {
    console.log(req.body)
    // not sure exactly what our request body is going to look like
    // BUT this is generally what the request should look like? 
    // maybe the 'current date' gets replaced with a PG variable?
    // results are sorted by route ID which hopefully makes things easier?

    // OTHERWISE if we need stuff separated on the server side here ... we can probably add route ID to the where statement

    const sqlQuery = `
    SELECT daily_dogs.*, dogs.name, dogs.client_id, dogs.flag, routes.name AS route_name    from "daily_dogs"
	    JOIN "routes" ON daily_dogs.route_id = routes.id
	    JOIN "dogs" ON daily_dogs.dog_id = dogs.id
	    JOIN "clients" ON dogs.client_id = clients.id
	WHERE daily_dogs.date = CURRENT_DATE
	ORDER BY daily_dogs.route_id;
    `

    pool.query(sqlQuery)
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('ERROR IN GETTING DAILY DOGS:', error);
            res.sensStatus(500);
        })
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
        (18, 1);
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
