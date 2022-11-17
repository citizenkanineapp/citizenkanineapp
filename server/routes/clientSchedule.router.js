const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

const {
    rejectUnauthorized,
  } = require('../modules/authorization-middleware');


router.get('/:id', rejectUnauthenticated, rejectUnauthorized, (req, res)=> {
    const client_id = req.params.id;
    console.log(client_id);
    // const sqlQ
})




module.exports = router;