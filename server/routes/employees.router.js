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

// gets all employee with schedule data for odd week;
router.get('/schedules', (req, res)=>{
    const sqlQuery=`
    SELECT * FROM 
        employees
    INNER JOIN
        employees_schedule
    ON
        employees.id = employees_schedule.emp_id
    WHERE employees_schedule.week = 1;
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