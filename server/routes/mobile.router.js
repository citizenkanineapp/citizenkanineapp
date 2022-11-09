module.exports = router;
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');


// GET ROUTE FOR DAILY DOGS SCHEDULE
router.get('/', rejectUnauthenticated, (req, res) => {
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
    // GET route code here
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    // POST route code here
});

// PUT ROUTE TO UPDATE DOG ROUTES FOR THE DAY
// if it's a put per move it's this:
router.put('/:id', rejectUnauthenticated, (req, res) => {
    // what is the req.body?
    console.log(req.body);

    // example SQL query for an update ... this would only be for one dog, and would have two separate values we change
    // in the route_id and the dog_id ... i figured the dog_id is more easily accessible than the actual table row key

    // Need to look into a DB connection promises thing
    const sqlQuery = `
    UPDATE daily_dogs
	SET 
		"route_id" = 3
	WHERE "dog_id" = 3;
    `
});

module.exports = router;
