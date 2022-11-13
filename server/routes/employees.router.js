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
router.get('/schedules/odd', (req, res)=>{
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
            console.log('error with GET /employees/schedules:', error);
        })


})

router.get('/schedules/even', (req, res)=>{
    const sqlQuery=`
    SELECT * FROM 
        employees
    INNER JOIN
        employees_schedule
    ON
        employees.id = employees_schedule.emp_id
    WHERE employees_schedule.week = 2;
    `
    pool.query(sqlQuery)
        .then(dbRes=> {
            res.send(dbRes.rows);
        })
        .catch(error=> {
            res.sendStatus(500);
            console.log('error with GET /employees/schedules:', error);
        })
})

// GET individual employee schedules:
router.get('/schedule/:id', (req, res)=> {
    const empID = req.params.id;
    console.log(empID);
    // the order by is to ensure the correct week is being targeted when setting the reducers for each week.
    const sqlQuery = `
    SELECT * FROM 
        employees_schedule
    WHERE emp_id = $1
    ORDER BY week;
    `

    pool.query(sqlQuery, [empID] )
        .then(dbRes=> {
            res.send(dbRes.rows);
            
        })
        .catch(error=> {
            res.sendStatus(500);
            console.log('error with GET /employees:', error);
        })
})



module.exports = router;