const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  const {
    rejectUnauthorized,
  } = require('../modules/authorization-middleware');



/**
 * This router is for admin notes 
 */

/**
 * GET route for admin notes
 */
router.get('/', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
// console.log('arrived in server get admin notes route')
let adminId = req.user.id
  const queryText = `
    SELECT admin_notes.id, admin_notes.user_id, admin_notes.notes, admin_notes.date, admin_notes.note_type, dogs.name, clients.last_name FROM admin_notes
      JOIN dogs
      ON admin_notes.dog_id = dogs.id
      JOIN clients
      ON dogs.client_id = clients.id
        ORDER BY date DESC
    ;
  `
  //no reason to filter admin notes by user
  // const queryText = `
  //           SELECT * FROM admin_notes
  //               WHERE user_id = $1;
  // `
// const queryValues = [adminId]
pool.query(queryText)
    .then(result => {
      // console.log(result.rows);
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
 router.post('/', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
    // console.log('does this get to server?', req.body)
    // console.log('who is user?', req.user.id)
    const {notes} = req.body
    const user = req.user.id
    console.log('in /admin/', notes);
    try{
    const noteTxt = `
              INSERT INTO admin_notes 
                ("user_id", "notes", "note_type", "dog_id") 
                VALUES
                ($1, $2, $3,$4) ;
    `
    const notesValues = [user, notes.notes, notes.note_type, notes.dog_id]
    pool.query(noteTxt, notesValues)
    res.sendStatus(201);
    } catch (error) {
      console.log('Error adding new admin note', error)
      res.sendStatus(500);
    }
  });

  //deleting and admin note

  router.delete('/:id', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
    // console.log(req.params.id)
    
    const queryText = 'DELETE FROM admin_notes WHERE id=$1';
    pool.query(queryText, [req.params.id])
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing delete admin notes');
        res.sendStatus(500);
      });
  });

  // sending not to packleaders

  router.put('/send/:id', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  
    const queryText = `UPDATE admin_notes SET note_type = 'topack' WHERE id=$1`
    pool.query(queryText, [req.params.id])
      .then(()=> { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error changing note type in order to send note to packleaders');
        res.sendStatus(500);
      })
  });


module.exports = router;
