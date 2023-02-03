const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const tools = require('../modules/tools')
// const cors = require('cors');
const request = require('request');
const router = express.Router();

let config ;
if (process.env.PORT) {
  config = require('../../config.json')
} else {
  config = require('../../config.dev.json')
}

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