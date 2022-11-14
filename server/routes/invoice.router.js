const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const dayjs =require('dayjs');
// This plugin is needed to get the week number in year:
const weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)



router.get('/', async (req, res) => {
    console.log('in /api/invoice');
    // const client = await pool.connect(); //used for batch queries?

    const sqlQuery = `
    SELECT
        daily_dogs.date,
        daily_dogs.checked_in AS checked_in,
        daily_dogs.no_show AS no_show,
        daily_dogs.cancelled AS cancelled,
        COUNT(dogs.id),
        MAX(clients.last_name),
        MAX(clients.first_name)
    FROM daily_dogs
        JOIN "dogs"
            ON daily_dogs.dog_id = dogs.id
        JOIN clients
            ON dogs.client_id = clients.id
    GROUP BY daily_dogs.date, checked_in, no_show, cancelled;
    `;

    try {
        const invoiceData = await pool.query(sqlQuery);

        const testDate = invoiceData.rows[0].date;
        console.log(testDate);
    } catch {

    }
});


module.exports = router;