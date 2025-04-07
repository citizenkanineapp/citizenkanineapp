const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc);

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

const {
    rejectUnauthorized,
  } = require('../modules/authorization-middleware');

router.post('/changes', rejectUnauthenticated, async (req, res) => {
    console.log('We are in the employeeSchedule router!')
})

module.exports = router;