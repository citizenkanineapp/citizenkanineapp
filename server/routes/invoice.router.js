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
    const searchTerms = [ searchClientId, searchMonth, searchYear ];
    console.log(searchTerms)
    const client = await pool.connect(); //used for batch queries?


    // use in case of client ALL
    // switch (weekday.number) {
    //     case 1:
    //         console.log('Monday');
    //         searchQuery += 'WHERE "1" = TRUE ORDER BY route_id;';
    //         break;
    // }

    // query returns data object of each walk instance by customer-date
    // AND walks-per week
    // will need to include search terms - invoice period date (month) and possibly client

    const queryWalkDetails = `
    SELECT
        clients.id AS clientid,
        daily_dogs.date,
        daily_dogs.week_of_year,
        COUNT(dogs.id) AS num_dogs,
        results2.walks_per_week,
        daily_dogs.checked_in AS checked_in,
        daily_dogs.no_show AS no_show,
        clients.last_name AS last_name,
        clients.first_name AS first_name
    FROM daily_dogs
        JOIN "dogs"
            ON daily_dogs.dog_id = dogs.id
        JOIN clients
            ON dogs.client_id = clients.id
        INNER JOIN (
            SELECT
                id AS client_id,
                week_of_year,
                COUNT(week_of_year) AS walks_per_week
            FROM (
                SELECT
                    daily_dogs.date,
                    daily_dogs.week_of_year,
                    COUNT(dogs.id) AS num_dogs,
                    clients.id
                FROM daily_dogs
                    JOIN "dogs"
                        ON daily_dogs.dog_id = dogs.id
                    JOIN clients
                        ON dogs.client_id = clients.id
                GROUP BY
                    daily_dogs.date,
                    clients.id,
                    daily_dogs.week_of_year
            ) results
                GROUP BY
                    client_id,
                    results.week_of_year
        ) results2
            ON (
                results2.week_of_year = daily_dogs.week_of_year
                AND dogs.client_id = results2.client_id
            )
    WHERE
        clients.id = $1 AND
        EXTRACT (MONTH FROM daily_dogs.date) = $2 AND
        EXTRACT (YEAR FROM daily_dogs.date) = $3 
    GROUP BY
        daily_dogs.date,
        results2.walks_per_week,
        checked_in, no_show,
        last_name,
        first_name,
        clientid,
        daily_dogs.week_of_year
    ORDER BY
        clientid,
        date;
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