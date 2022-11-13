const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get all employees
router.get('/', (req, res)=> {
    const sqlQuery = `
    SELECT * FROM employees
    ORDER BY employees.last_name;
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

// get individual employee
router.get('/:id', (req, res)=> {
    const empID = req.params.id;
    const sqlQuery = `
    SELECT * FROM employees
    WHERE id = $1;
    `

    pool.query(sqlQuery, [empID])
        .then(dbRes=> {
            res.send(dbRes.rows);
        })
        .catch(error=> {
            res.sendStatus(500);
            console.log('error with GET /employees/:id :', error);
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
            console.log('error with GET /employees/schedules/odd :', error);
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
            console.log('error with GET /employees/schedules/even :', error);
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
            // console.log('employee schedules',dbRes.rows);
        })
        .catch(error=> {
            res.sendStatus(500);
            console.log('error with GET /employees/schedule/:id :', error);
        })
})

// Update Employee details:

router.put('/details', (req, res)=>{
    const updatedEmp = req.body;
    // console.log(updatedEmp);
    // {id: 1, first_name: 'Den', last_name: 'P', email: 'dpaolini0@paypal.com', phone: '(840)6732127', image: null, street: '2900 W 43rd St', city: 'Minneapolis', zip: 55410, date: '2022-11-11T06:00:00.000Z'}
    const {id, first_name, last_name, email, phone, street, city, zip} = updatedEmp;

    const sqlQuery=
    `
    UPDATE 
        employees
    SET
        first_name = $1, 
        last_name = $2,
        email = $3, 
        phone = $4, 
        street = $5, 
        city = $6, 
        zip = $7
    WHERE
        id = $8
    `

    const sqlValues = [first_name, last_name, email, phone, street, city, zip, id];


    pool.query(sqlQuery, sqlValues)
        .then(dbRes=> {
            res.sendStatus(201);
            
        })
        .catch(error=> {
            res.sendStatus(500);
            console.log('error with PUT /employees/details:', error);
        })
})

// Update selected employee schedule:
// router.put('/schedules', (req, res)=>{
//     const week1 = req.body[0];
//     console.log(week1)

//     const sqlQuery = 
//     `
//     UPDATE 
//         employees_schedule
//     SET
//         "1" = $1,
//         "2" = $2,
//         "3" = $3,
//         "4" = $4,
//         "5" = $5
//     WHERE id = $6;
//     `

//     const sqlValues = [ week1[1], week1[2], week1[3], week1[4], week1[5], week1['id']];

//     pool.query(sqlQuery, sqlValues)
//         .then(dbRes=> {
//             res.sendStatus(201);
            
//         })
//         .catch(error=> {
//             res.sendStatus(500);
//             console.log('error with PUT /employees/schedules:', error);
//         })
// })

// Update selected employee schedules simultaneously:
router.put('/schedules', async (req, res)=>{
    const schedules = req.body;

    const client = await pool.connect();

    try{
        await Promise.all(schedules.map(schedule=>{
            const sqlQuery = 
            `
            UPDATE 
                employees_schedule
            SET
                "1" = $1,
                "2" = $2,
                "3" = $3,
                "4" = $4,
                "5" = $5
            WHERE id = $6`;

            const sqlValues = [ schedule[1], schedule[2], schedule[3], schedule[4], schedule[5], schedule['id']];
            return client.query(sqlQuery, sqlValues);
        }))
    }
        catch(error) {
            res.sendStatus(500);
            console.log('error in PUT /employees/schedules', error)
        }
    

})



module.exports = router;