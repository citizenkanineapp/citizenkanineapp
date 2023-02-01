const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const tools = require('../modules/tools')
// const cors = require('cors');
const config = require('../../config.json');
const request = require('request');
const router = express.Router();

router.get('/', ( req, res ) => {
    const streamSource = process.env ;
    // console.log('in /source, streamsource: ', streamSource);
    res.send(streamSource);    
})


router.get('/test', ( req, res ) => {
    const streamSource = process.env.STREAMSOURCE;
    console.log('in /source, streamsource: ', streamSource);
    res.send(streamSource);    
})

module.exports = router;