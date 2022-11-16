const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/:id', (req, res)=> {
    const client_id = req.params.id;
    console.log(client_id);
    // const sqlQ
})




module.exports = router;