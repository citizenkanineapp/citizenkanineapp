const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc);

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

const {
    rejectUnauthorized,
  } = require('../modules/authorization-middleware');


router.get('/:id', rejectUnauthenticated, rejectUnauthorized, (req, res)=> {
    const client_id = req.params.id;
    console.log('get route', client_id);
    const sqlQuery = `
    SELECT id, dog_id, client_id, date_to_change, is_scheduled FROM dogs_schedule_changes
    WHERE client_id = $1;
    `

    pool.query(sqlQuery, [client_id])
        .then(dbRes=> {
            // console.log('before', dbRes.rows);
            let datesToChange = dbRes.rows
            let formattedDates = dateFormatFunction(datesToChange)
            //console.log(formattedDates)
            res.send(formattedDates);
          

        })
        .catch(error=> {
            res.sendStatus(500);
            console.log('error with GET /api/clientSchedule/:id :', error);
        })
})

function dateFormatFunction(dates) {
  dates.forEach(date => date.date_to_change = dayjs(date.date_to_change).utc(true).format('YYYY-MM-DD'))
  // console.log('in function', dates)
  return dates
}


module.exports = router;