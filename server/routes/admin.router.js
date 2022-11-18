const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');


/**
 * This router is for admin notes 
 */

/**
 * GET route for admin notes
 */
router.get('/', (req, res) => {
console.log('arrived in server get admin notes route')
let adminId = req.user.id
  const queryText = `
            SELECT * FROM admin_notes
                WHERE user_id = $1;
  `
const queryValues = [adminId]
pool.query(queryText, queryValues)
    .then(result => {
   
    console.log('result from query?', result.rows)


        res.send(result.rows);
   
    })
    .catch(err => {
        console.log('Error getting admin notes', err);
        res.sendStatus(500);
    })
});

/**
 * POST route for admin notes
 */
 router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body)
    console.log('who is user?', req.user.id)
    const {notes} = req.body
    const user = req.user.id

    try{
    const noteTxt = `
              INSERT INTO admin_notes 
                ("user_id", "notes") 
                VALUES
                ($1, $2) ;
    `
    const notesValues = [user, notes]
    pool.query(noteTxt, notesValues)
    res.sendStatus(201);
    } catch (error) {
      console.log('Error adding new admin note', error)
      res.sendStatus(500);
    }
  });

module.exports = router;
