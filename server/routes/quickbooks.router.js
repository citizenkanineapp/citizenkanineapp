const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const tools = require('../modules/tools')
const cors = require('cors');
const config = require('../../config.json');
const request = require('request');
const router = express.Router();

const {
  checkAuthTokens,
} = require('../modules/oauth2-middleware');

router.get('/connect_handler', (req, res) => {
    // GET route code here
    console.log('in api/quickbooks/connect_handler');
    console.log(req.session.data)
    // console.log(req)
   
    // Set  Accounting scopes
    tools.setScopes('connect_handler')

    // // Constructs the authorization URI.
    var uri = tools.intuitAuth.code.getUri({
        // Add CSRF protection
        state: tools.generateAntiForgery(req.session)
    })
    // Redirect
    console.log('Redirecting to authorization uri: ' + uri)
    // console.log('after generating CSRF state',req.session)
    res.redirect(uri);
  });

  router.get('/callback', function (req, res) {
    console.log('in /api/quickbooks/callback');
    // console.log('do we get req.session.realmId', req.session)
    // Verify anti-forgery
    if(!tools.verifyAntiForgery(req.session, req.query.state)) {
        return res.send('Error - invalid anti-forgery CSRF response!')
    }

    // Exchange auth code for access token
    tools.intuitAuth.code.getToken(req.originalUrl).then(async function (token) {
    // Store token - this would be where tokens would need to be
    // persisted (in a SQL DB, for example).
    tools.saveToken(req.session, token)

    console.log('token', token);
    
    try {
      // const tokensQuery = (tokenType, interval)=>{
      //   return `
      //     UPDATE "oauth2_${tokenType}_tokens"
      //       SET
      //         ${tokenType}_token = $1,
      //         time = NOW() + interval '${interval}'
      //       WHERE id = 1 
      //       RETURNING time;
      //   `
      // }
      const tokensQuery = `
        UPDATE "oauth2_tokens"
          SET
            access_token = $1,
            access_time = NOW() + INTERVAL '3600 seconds',
            refresh_token = $2,
            refresh_time = NOW() + INTERVAL '8726400 seconds'
          WHERE id = 1
          RETURNING access_time, refresh_time;
      `
    const accessTime = await pool.query(tokensQuery,[token.accessToken, token.refreshToken]);
    console.log(accessTime.rows);

    } catch(err) {
 
    }
    req.session.realmId = req.query.realmId;

    res.redirect('http://localhost:3000/#/about')
  
    })
})

  /*this is the Get route to get customer from quickbooks
  the functions called inside prepare the customers to be inserted 
                  into DB*/


router.get('/customer', checkAuthTokens, (req, res) => {
  console.log('in server fetch customers')
  var token = tools.getToken(req.session)
  // console.log(token.accessToken)
  // console.log(tools.basicAuth)

  var query = '/query?query= select * from customer'
  var url = config.api_uri + req.session.realmId + query
  console.log('Making API Customer call to: ' + url)
  
  // tools.refreshTokensWithToken(token.refreshToken)

  var requestObj = {
    url: url,
    headers: {
      'Authorization': 'Bearer ' + token.accessToken,
      'Accept': 'application/json'
    }
  }

  request(requestObj, function (err, response) { 
    // req.session.accessToken = 'bad!'
    // req.session.refreshToken = '0202'
    console.log('first log', tools.getToken(req.session))

    tools.checkForUnauthorized(req, requestObj, err, response).then(async function ({ err, response }) {
      // if (err&& err.data.error === 'invalid_grant') {
      //   // console.log('in CHECK FOR UNAUTHORIZED', err.data.error)
      // }
      if (err || response.statusCode != 200) {
        if(err.body.error === 'invalid_grant') {
          console.log(err.body.error)
          res.send('connectToQB')

        } else {
        return res.json({ error: err, statusCode: response.statusCode })
        }
      } else {




        let customers = JSON.parse(response.body)
      
        //this function starts the process of formatting the customers
        let filteredCustomers =  filterCustomers(customers)
        req.session.data.extra = 'testd';
        console.log('second log', tools.getToken(req.session))

        /*  this sucessfully sent back the customers after being processed
        do we need to worry about timing issues long term?  */
        res.send(filteredCustomers)
      }
      
    }, function (err) {
      console.log(err)
      return res.json(err)
    })
  })
  
  })

  function filterCustomers(customers) {
    
    let customerArray = customers.QueryResponse.Customer //what comes from QB API
    let customersAfterProcessing = []
    for (let oneCustomer of customerArray) {
      // console.log(oneCustomer)
      let mobile;
      if(oneCustomer.hasOwnProperty('Mobile')){
        mobile = oneCustomer.Mobile.FreeFormNumber   //some customers don't have mobile
      } else {                                      //this handles undefined errors
        mobile = ""
      }
      let customer = {
        client_id: Number(oneCustomer.Id),
        notesObj: oneCustomer.Notes,
        email: oneCustomer.PrimaryEmailAddr.Address,
        first_name: oneCustomer.GivenName,
        last_name: oneCustomer.FamilyName,
        phone: oneCustomer.PrimaryPhone.FreeFormNumber,
        mobile: mobile,
        street: oneCustomer.BillAddr.Line1,
        city: oneCustomer.BillAddr.City,
        zip: oneCustomer.BillAddr.PostalCode,
        notes: oneCustomer.ShipAddr.Line1
      }
      customersAfterProcessing.push(customer)
    }
    // this next function deals with dogs' names and schedules 
    let customersWithSchedule = getDogSchedule(customersAfterProcessing)
    //one more filter to remove key no longer needed on object
    let finalCustomers = customersWithSchedule.filter(customer => delete customer.notesObj);
    return finalCustomers;
  }
  
  function getDogSchedule(customers) {
   
    let customerArray = []
    for (let oneCustomer of customers) {
      let result = oneCustomer.notesObj.split("-")
  
      //this sections gets rid of extra spaces that might be surrounding each string 
      let dogsArray = result[0].split(",").map(function (dogName) {
        return dogName.trim();
      })
      let scheduleArray = result[1].split(",").map(function (dayName) {
        return dayName.trim();
      })
    
        oneCustomer.dogs = dogsArray,   //adding dogs key to customer object
        oneCustomer.schedule =  scheduleArray, //adding schedule key to customer obj
      
        customerArray.push(oneCustomer)
      
    }
   return customerArray
  
  }
  
  

module.exports = router;
