const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const tools = require('../modules/tools')
// const cors = require('cors');
const config = require('../../config.json');
const request = require('request');
const router = express.Router();


router.post('/', (req, res) => {
  // console.log('in server post invoice',req.body);

  const token = tools.getToken(req.session);

  // console.log(token.accessToken)
  // console.log(tools.basicAuth)

  const query = '/invoice?';
  const url = config.api_uri + req.session.realmId + query ;
  console.log('Making API INVOICE call to: ' + url);

  invoiceData = {
    "Line": [
      {
        "Amount":req.body[0].service.price,
        "DetailType":"SalesItemLineDetail",
        "salesItemLineDetail": {
          "ItemRef": {
            "value": "21",
            "name": req.body[0].service.service
          }
        }
      },
      {
        "Amount":req.body[2].service.price,
        "DetailType":"SalesItemLineDetail",
        "salesItemLineDetail": {
          "ItemRef": {
            "value": "24",
            "name": req.body[2].service.service
          }
        }
      },
    ],
    "CustomerRef": {
      "value": "58"
    }
  }  
  // console.log(invoiceData)
  
  // tools.refreshTokensWithToken(token.refreshToken)

  const requestObj = {
    // method: 'POST',
    url: url,
    headers: {
      'Authorization': 'Bearer ' + token.accessToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data: invoiceData
  }


  request(requestObj, function (err, response) { 
    // FOR TESTING
    console.log(requestObj)
    // console.log('first log', tools.getToken(req.session))

    // checks current access token. If access token is expired, it renews access token with stored refresh token.
    // we need to test this at least 36 hours after refresh changes.

    tools.checkForUnauthorized(req, requestObj, err, response).then(async function ({ err, response }) {
        // status code 401 corrosponds to unauthorized request.
        // in future testing. 'invalid_grant' also occurs;; err.body.error ;; when should we specify?
      if (response.statusCode === 401 ) {
        // FOR TESTING
        // console.log(response.statusCode)
        // console.log(err.body)
        // If unauthorized, send this command back to client. if fetchQbCustomers in quickbooks.saga.js recieves command, client redirects to /connect_to_qb route.
        res.send('connectToQB')

        // don't know if this second else-if block is necessary, ie, covering non-401 errors.
      } else if (err || response.statusCode != 200) {
        return res.json({ error: err, statusCode: response.statusCode })
      } else {

        console.log(response)
      }
      
    }, function (err) {
      console.log(err)
      return res.json(err)
    })
  })
  
  })

  

module.exports = router;
