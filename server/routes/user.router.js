const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// THIS POST if for adding a new user from the registration page only:
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
// THIS POST is for a user being added when an employee is added.
router.post('/register/employee', (req, res, next) => {
  const { username, emp_id, admin } = req.body;

  // All new users will have a default password of 'packleader' until the user logs in and updates it.
  const defaultPassword= 'packleader';
  const password = encryptLib.encryptPassword(defaultPassword);
  console.log('register post received');

  const queryText = `INSERT INTO "user" (emp_id, username, password, admin)
    VALUES ($1, $2, $3, $4) RETURNING id`;

  const queryValues = [emp_id, username, password, admin]

  // const queryText = `INSERT INTO "user" (emp_id, username, password, email, admin)
  //   VALUES ($1, $2, $3, $4, $5) RETURNING id`;

  // const queryValues = [emp_id, username, password, email, admin]
  pool
    .query(queryText, queryValues)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

//PUT route for password reset. need user ID params.
router.put('/passreset/:id', (req, res) => {
  const userId = req.params.id;
  console.log(req.params.id)
  console.log(req.body.password);
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `UPDATE "user" 
    SET "password" = $1
    WHERE "id" = $2;`;
  pool
    .query(queryText, [password, userId])
    .then(()=> res.sendStatus(201))
    .catch((err)=> {
      console.log('Password reset failed. ', err);
      res.sendStatus(500);
    })
})

// PUT route to update the admin status when an employee's details are changed. 

router.put('/admin', (req, res)=> {
  const { admin, emp_id} = req.body;
  // console.log(admin);
  const sqlQuery = 
    `
    UPDATE 
      "user"
    SET
      admin = $1
    WHERE 
      emp_id = $2;
    `
  const sqlValues = [admin, emp_id]

  pool.query(sqlQuery, sqlValues)
    .then(dbRes => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });

})

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
