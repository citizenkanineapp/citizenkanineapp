const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const dayjs =require('dayjs');
// This plugin is needed to get the week number in year:
const weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)

router.get('/', async (req, res) => {
    console.log('in /api/invoice');
    console.log(req.query)
    const searchClientId = req.query.clientId;
    const searchMonth = req.query.month;
    const searchYear = req.query.year;
    let searchTerms ;

    // use in case of client ALL
    if (searchClientId) {
        searchQuery = `
            WHERE
                clients.id = $1 AND
                EXTRACT (MONTH FROM daily_dogs.date) = $2 AND
                EXTRACT (YEAR FROM daily_dogs.date) = $3
            `;
        searchTerms = [ searchClientId, searchMonth, searchYear ];
    } else {
        searchQuery = `
            WHERE
                EXTRACT (MONTH FROM daily_dogs.date) = $1 AND
                EXTRACT (YEAR FROM daily_dogs.date) = $2
            `;
        searchTerms = [ searchMonth, searchYear ];
    }

    console.log(searchQuery);

    // query returns data object of each walk instance by customer-date
    // 
    // query needs adjustment so that walks/per week is derived from client_schedule data, not actual walks per week.


    // DOES DAILYDOGS CURRENTLY TRACK NO_SHOWS??????

    const queryWalkDetails = `
    SELECT
        clientid,
        first_name,
        last_name,
        num_dogs,
        ARRAY_AGG (
            EXTRACT (MONTH FROM date)||'/' || EXTRACT (DAY FROM date)
            ORDER by date ASC
        ) dates,
        checked_in,
        no_show
    FROM (	
        SELECT
            clients.id AS clientid,
            daily_dogs.date,
            daily_dogs.week_of_year,
            COUNT(dogs.id) AS num_dogs,
            daily_dogs.checked_in AS checked_in,
            daily_dogs.no_show AS no_show,
            clients.last_name AS last_name,
            clients.first_name AS first_name
        FROM daily_dogs
            JOIN "dogs"
                ON daily_dogs.dog_id = dogs.id
            JOIN clients
                ON dogs.client_id = clients.id`
        + searchQuery +
        `
            GROUP BY
                daily_dogs.date,
                checked_in,
                no_show,
                last_name,
                first_name,
                clientid,
                daily_dogs.week_of_year
            ORDER BY
                clientid,
                date
        ) results
    GROUP BY
        clientid,
        first_name,
        last_name, 
        num_dogs,
        checked_in,
        no_show;
    `;

    try {
        const resDetails = await pool.query(queryWalkDetails,searchTerms);
        const invoiceData = resDetails.rows;
        console.log(invoiceData);
        res.send(invoiceData);
    } catch (error) {
        console.log('Error GET /api/invoice', error);
        res.sendStatus(500);
    }
});

module.exports = router;