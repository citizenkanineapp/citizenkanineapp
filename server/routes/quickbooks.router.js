const express = require('express');
const axios = require('axios');
const app = express();
const pool = require('../modules/pool');
const tools = require('../modules/tools')
const cors = require('cors');
const config = require('../../config.json')
const request = require('request')

const router = express.Router();


// var corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
// app.use(cors());

// router.get('/trigger', async (req, res) => {
//   console.log('trigger');
//    try{
//     const connectHandler = await axios.get('http://localhost:5000/api/quickbooks/connect_handler')
//     console.log('anything happen here?', connectHandler)
//     res.sendStatus(200)
//    }catch(error){
//     console.log('error in get request in trigger', error)
//    }
//         // .then((res)=>{
//         //     // console.log('res', res);
//         // })
//         // .catch((err)=>{
//         //     console.log('err!', err);
//         // })
//  })

router.get('/connect_handler', (req, res) => {
    // GET route code here
    console.log('in api/quickbooks/connect_handler');
    console.log(req.session)
   
    // Set  Accounting scopes
    tools.setScopes('connect_handler')

    // // Constructs the authorization URI.
    var uri = tools.intuitAuth.code.getUri({
        // Add CSRF protection
        state: tools.generateAntiForgery(req.session)
    })
    // Redirect
    console.log('Redirecting to authorization uri: ' + uri)
      res.redirect(uri);
  });

  router.get('/callback', function (req, res) {
    console.log('in /api/quickbooks/callback')
    console.log('do we get req.session.realmId', req.session)
    // Verify anti-forgery
    if(!tools.verifyAntiForgery(req.session, req.query.state)) {
        return res.send('Error - invalid anti-forgery CSRF response!')
    }

    // Exchange auth code for access token
    tools.intuitAuth.code.getToken(req.originalUrl).then(function (token) {
    // Store token - this would be where tokens would need to be
    // persisted (in a SQL DB, for example).
    tools.saveToken(req.session, token)
    req.session.realmId = req.query.realmId
    console.log(req.session.realmId);

    res.redirect('http://localhost:3000/#/about')
  
    })
})

  /*this is the Get route to get customer from quickbooks
  the functions called inside prepare the customers to be inserted 
                  into DB*/

router.get('/customer', function (req, res) {
    console.log('in server fetch customers')
    var token = tools.getToken(req.session)
    console.log('tokens',token.expires);
    var query = '/query?query= select * from customer'
    var url = config.api_uri + req.session.realmId + query
    console.log('Making API Customer call to: ' + url)

    axios({
      method: 'GET',
      url: url,
      headers: {
        'Authorization': 'Bearer ' + token.accessToken,
        'Accept': 'application/json'
      }
    }).then(response=>{
      const customers = response.data;
      //this function starts the process of formatting the customers
      let filteredCustomers =  filterCustomers(customers)
      res.send(filteredCustomers);
      // /*  this sucessfully sent back the customers after being processed
      // do we need to worry about timing issues long term?  */
    }).catch(error=>{
      console.log('err',error);
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
