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

router.get('/trigger', async (req, res) => {
  console.log('trigger');
   try{
    const connectHandler = await axios.get('http://localhost:5000/api/quickbooks/connect_handler')
    console.log('anything happen here?', connectHandler)
    res.sendStatus(200)
   }catch(error){
    console.log('error in get request in trigger', error)
   }
        // .then((res)=>{
        //     // console.log('res', res);
        // })
        // .catch((err)=>{
        //     console.log('err!', err);
        // })
 })

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
    // TO SEE /callback console.logs, copy generated uri from terminal and paste in browser. once Qb log in is complete, a req is sent to teh /callback endpoint!

    // res.redirect('http://localhost:5000/api/callback');
    // res.send(uri);
    

      res.redirect(uri);

 
    // axios.get('http://localhost:5000/api/callback')
    //     .then(res=>{
    //         console.log(200)
    //     })
    //     .catch(err=>{
    //         console.log('err!')
    //     })
  });

  router.get('/customer', function (req, res) {
    console.log('in server fetch customers')
    var query = '/query?query= select * from customer'
    var url = config.api_uri + req.session.realmId + query
    // console.log('Making API Customer call to: ' + url)
    var requestObj = {
      url: url,
      headers: {
        // 'Authorization': 'Bearer ' + token.accessToken,
        'Accept': 'application/json'
      }
  
    }
  
    request(requestObj, function (err, response) {
  
      tools.checkForUnauthorized(req, requestObj, err, response).then(function ({ err, response }) {
        if (err || response.statusCode != 200) {
          return res.json({ error: err, statusCode: response.statusCode })
        }
        //success
        // maybe in our app we would limit what we sent back at this point
        let customers = JSON.parse(response.body)
        console.log('is this JSON customers', customers)

        //this gets the customers ready for the Client side of application
        let filteredCustomers =  filterCustomers(JSON.parse(response.body))
        console.log('back to top level?', filteredCustomers)
        
        //this sucessfully sent back the customers after being processed
        //do we need to worry about timing issues long term?
        res.send(filteredCustomers)
      }, function (err) {
        console.log(err)
        return res.json(err)
      })
    })
  
  })

  function filterCustomers(customers) {
    // console.log('customer function', customers.QueryResponse)
    let customerArray = customers.QueryResponse.Customer
    let customerNotes = []
    for (let oneCustomer of customerArray) {
      let customer = {
        client_id: Number(oneCustomer.Id),
        notesObj: oneCustomer.Notes
      }
      // console.log('id?', oneCustomer.Id)
      // console.log('id is a number?', Number(oneCustomer.Id))
      customerNotes.push(customer)
    }
    let customersWithSchedule = getDogSchedule(customerNotes)
    return customersWithSchedule
  }
  
  function getDogSchedule(dogNotes) {
    // this function processes the data from the Notes field on QB
    //and breaks it out into dog and schedule arrays to be added to customer object
    //and sent to client in CK app
    let customerArray = []
    for (let dog of dogNotes) {
      let result = dog.notesObj.split("-")
  
      //this sections gets rid of extra spaces that might be surrounding each string 
      let dogsArray = result[0].split(",").map(function (dogName) {
        return dogName.trim();
      })
      let scheduleArray = result[1].split(",").map(function (dayName) {
        return dayName.trim();
      })
      // console.log('dogs array', dogsArray)
      // console.log('schedule array', scheduleArray)
      let customer = {
        dogs: dogsArray,
        schedule: scheduleArray,
        client_id: dog.client_id
      }
      //adds each indidual customer object to the array of objects (customers)
      customerArray.push(customer)
      // console.log('one customer is:', customer)
    }
  
    // console.log(customerArray)
   return customerArray
  
  }
  
  

module.exports = router;
