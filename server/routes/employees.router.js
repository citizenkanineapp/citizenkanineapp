const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

const {
    rejectUnauthorized,
  } = require('../modules/authorization-middleware');

// get all employees
router.get('/', rejectUnauthenticated, (req, res)=> {
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
router.get('/:id', rejectUnauthenticated, (req, res)=> {
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
router.get('/schedules/odd', rejectUnauthenticated, (req, res)=>{
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

router.get('/schedules/even',rejectUnauthenticated, (req, res)=>{
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
router.get('/schedule/:id', rejectUnauthenticated, (req, res)=> {
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
router.put('/details', rejectUnauthenticated, (req, res)=>{
    const updatedEmp = req.body;
    // console.log(updatedEmp);
    // {id: 1, first_name: 'Den', last_name: 'P', email: 'dpaolini0@paypal.com', phone: '(840)6732127', image: null, street: '2900 W 43rd St', city: 'Minneapolis', zip: 55410, date: '2022-11-11T06:00:00.000Z'}
    const {id, first_name, last_name, email, phone, street, city, zip, admin} = updatedEmp;

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
        zip = $7,
        admin = $8
    WHERE
        id = $9
    `

    const sqlValues = [first_name, last_name, email, phone, street, city, zip, admin, id];


    pool.query(sqlQuery, sqlValues)
        .then(dbRes=> {
            res.sendStatus(201);
            
        })
        .catch(error=> {
            res.sendStatus(500);
            console.log('error with PUT /employees/details:', error);
        })
})

// Update selected employee schedules simultaneously:
router.put('/schedules', rejectUnauthenticated, async (req, res)=>{
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

// POST new employee
router.post('/', rejectUnauthenticated, async (req, res)=> {
    const client = await pool.connect();
    const empDetails = req.body[0];
    const schedule = [req.body[1], req.body[2]];
    // let emp_id = 0;

    try{
        const {first_name, last_name, zip, city, phone, street, email, admin} = empDetails;
        await client.query('BEGIN');
        const addEmployee = await client.query(
            `
            INSERT INTO employees
                (first_name, last_name, zip, city, phone, street, email, admin)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id`, [first_name, last_name, zip, city, phone, street, email, admin]);

            const emp_id = addEmployee.rows[0].id;

        await Promise.all(schedule.map(week => {
            const sqlQuery = 
            `
            INSERT INTO employees_schedule
                (emp_id, week, "1", "2", "3", "4", "5")
            VALUES
                ($1, $2, $3, $4, $5, $6, $7);
            `

            const sqlValues = [emp_id, week['week'], week[1], week[2], week[3], week[4], week[5]]

            return client.query(sqlQuery, sqlValues);
        }));
        await client.query('COMMIT')
        res.send({emp_id});
    }
    catch(error) {
        res.sendStatus(500);
        console.log('error in POST /employees', error)
    }
    // finally {
    //     res.send(emp_id);
    // }
})



module.exports = router;