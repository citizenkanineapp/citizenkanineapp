const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res)=> {
    const sqlQuery = `
    SELECT * FROM employees;
    `

    pool.query(sqlQuery)
        .then(dbRes=> {
            res.send(dbRes.rows);
        })
        .catch(error=> {
            res.sendStatus(500);
            console.log('error with GET /employees:', error);
        })
})

router.get('/schedules', (req, res)=>{
    const sqlQuery=`
    SELECT * FROM employees_schedule;
    `
    pool.query(sqlQuery)
        .then(dbRes=> {
            res.send(dbRes.rows);
        })
        .catch(error=> {
            res.sendStatus(500);
            console.log('error with GET /employees/shedules:', error);
        })


})



module.exports = router;