const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/:id', (req, res)=> {
    const client_id = req.params.id;
    // console.log(client_id);
    const sqlQuery = `
    SELECT id, dog_id, client_id, date_to_change::date, is_scheduled FROM dogs_schedule_changes
    WHERE client_id = $1;
    `

    pool.query(sqlQuery, [client_id])
        .then(dbRes=> {
            res.send(dbRes.rows);
        })
        .catch(error=> {
            res.sendStatus(500);
            console.log('error with GET /api/clientSchedule/:id :', error);
        })
})




module.exports = router;