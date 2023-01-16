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


      res.redirect(uri);
  });


        /*this is the Get route to get customer from quickbooks
        the functions called inside prepare the customers to be inserted 
                        into DB*/

router.get('/customer', function (req, res) {
    let token = tools.getToken(req.session)
    console.log('in server fetch customers')
    var query = encodeURI('/query?query= select * from customer')
    var url = config.api_uri + req.session.realmId + query
    // console.log('Making API Customer call to: ' + url)
    var requestObj = {
      url: url,
      headers: {
        'Authorization': 'Bearer ' + token.accessToken,
        'Accept': 'application/json'
      }
  
    }

    request(requestObj, function (err, response) {
  
      tools.checkForUnauthorized(req, requestObj, err, response).then(function ({ err, response }) {
        if (err || response.statusCode != 200) {
          return res.json({ error: err, statusCode: response.statusCode })
        }

        let customers = JSON.parse(response.body)
      
        //this function starts the process of formatting the customers
        let filteredCustomers =  filterCustomers(customers)

        //one more filter to remove key no longer needed on object
        let finalCustomers = filteredCustomers.filter(customer => delete customer.notesObj )
        

        /*  this sucessfully sent back the customers after being processed
        do we need to worry about timing issues long term?  */
        res.send(finalCustomers)
        
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
      let route_id;
      let vet_name;
      let vet_phone;
      if(oneCustomer.hasOwnProperty('Mobile')){
        mobile = oneCustomer.Mobile.FreeFormNumber   //some customers don't have mobile
      } else {                                      //this handles undefined errors
        mobile = ""
      }
      if(!oneCustomer.hasOwnProperty('route_id')){
        route_id = 5      //adds a default route_id of unassigned
                           //QB doesn't have route data but it is needed 
      }
      let customer = {
        qb_id: Number(oneCustomer.Id),
        notesObj: oneCustomer.Notes,
        email: oneCustomer.PrimaryEmailAddr.Address,
        first_name: oneCustomer.GivenName,
        last_name: oneCustomer.FamilyName,
        phone: oneCustomer.PrimaryPhone.FreeFormNumber,
        mobile: mobile,
        street: oneCustomer.BillAddr.Line1,
        city: oneCustomer.BillAddr.City,
        zip: oneCustomer.BillAddr.PostalCode,
        notes: oneCustomer.ShipAddr.Line1,
        route_id: route_id
      }
      customersAfterProcessing.push(customer)
    }
    // this next function deals with dogs' names and schedules 
    let customersWithSchedule = getDogSchedule(customersAfterProcessing)
    return customersWithSchedule
  }
  
  function getDogSchedule(customers) {
   
    let customerArray = []
    for (let oneCustomer of customers) {
      let result = oneCustomer.notesObj.split("-")
  
      //this sections gets rid of extra spaces that might be surrounding each string 
      let dogsArray = result[0].split(",").map(function (dogName) {
        return {name: dogName.trim(), 
                notes: "", 
                flag: false, 
                active: true, 
                regular: true,     //creating a dog object for each dog
                image: "",
                vet_name: "",
                vet_phone: ""
              };
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

  /*To initially add QB customers to DB */
  router.post('/qbcustomers', async (req, res) => {
    // console.log('arrvied in server?', req.body)

    const client = await pool.connect();
    const customers = req.body // obj desctructing of QB data
    // const dogsArray = dogs
    // const scheduleArray = schedule

    
      //geocoding for customers
   
      const api_key = process.env.map_api_key;
      const config = { headers: { Authorization: api_key } };

      let geoStatsResponse = await Promise.all(customers.map(async customer => {
      
      const address = customer.street.replace(/ /g, "+");
      const town = customer.city.replace(/ /g, '');
      const zip = customer.zip

      const geoStats = await axios.get(`https://api.radar.io/v1/geocode/forward?query=${address}+${town}+${zip}`, config);
  
      // console.log('geostats data', geoStats.data)
      const lat = geoStats.data.addresses[0].latitude;
      const long = geoStats.data.addresses[0].longitude;
      // console.log('heres the geoStats!', lat, long);
      customer.lat = lat
      customer.long = long
    return customer
    }))
    // console.log(geoStatsResponse)
    let customersResult = processSchedule(geoStatsResponse)
    // console.log('after schedule processing',  customersResult)

    try{ 
      await client.query('BEGIN')
      for (let eachCustomer of customersResult){
        const clientTxt = await client.query( `
                            INSERT INTO clients 
                              ("qb_id", "first_name", "last_name", "street", "city", "zip", "route_id", "phone", "mobile", "email", "notes", "lat", "long") 
                              VALUES
                              ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                              RETURNING "id";
    ` , [eachCustomer.qb_id, eachCustomer.first_name, eachCustomer.last_name, 
                            eachCustomer.street, eachCustomer.city, eachCustomer.zip, eachCustomer.route_id, eachCustomer.phone, eachCustomer.mobile,
                            eachCustomer.email, eachCustomer.notes, eachCustomer.lat, eachCustomer.long])
      const customerId = clientTxt.rows[0].id
      eachCustomer.client_id = customerId
    }
    console.log('does it add client_id', customersResult)
    for(let eachCustomer of customersResult){
      await Promise.all(eachCustomer.dogs.map(dog => {
        const dogTxt = `
                            INSERT INTO dogs 
                                ("client_id", "name", "image", "vet_name", "vet_phone", "notes", "flag", "regular", "active") 
                              VALUES
                                ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  
        `
        const dogValues = [eachCustomer.client_id, dog.name, dog.image, dog.vet_name, dog.vet_phone, dog.dog_notes, dog.flag, dog.regular, dog.active]
        return client.query(dogTxt, dogValues)
      }));
    }
    for(let eachCustomer of customersResult) {
        const scheduleTxt = `
                              INSERT INTO clients_schedule
                              ("client_id", "1", "2", "3", "4", "5")  
                              VALUES
                              ($1, $2, $3, $4, $5, $6)
  `
        const dayValues = [eachCustomer.client_id, eachCustomer.monday, eachCustomer.tuesday, 
                            eachCustomer.wednesday, eachCustomer.thursday, eachCustomer.friday]
        await client.query(scheduleTxt, dayValues)
    }
      await client.query('COMMIT')
      res.sendStatus(201);
    } catch (error) {
      await client.query('ROLLBACK')
      console.log('Error in post route for add clients from QB', error);
      res.sendStatus(500);
    } finally {
      client.release()
    }
  });
  
  function processSchedule (customers) {
    // console.log(customers)

    /* Schedule from QB sample
          ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri' ]
    
    */

    for (let customer of customers){
      let schedule = customer.schedule
      //default values for each schedule
      customer.monday = false
      customer.tuesday = false
      customer.wednesday = false
      customer.thursday = false
      customer.friday = false

      // console.log(schedule)
      if(schedule.includes('Mon')){
        customer.monday = true
      }
      if(schedule.includes('Tues')){
        customer.tuesday = true
      }
      if(schedule.includes('Wed')){
        customer.wednesday = true
      }
      if(schedule.includes('Thurs')){
        customer.thursday = true
      }
      if(schedule.includes('Fri')){
        customer.friday = true
      }
      if(schedule.includes('Daily')){
        customer.monday = true
        customer.tuesday = true
        customer.wednesday = true
        customer.thursday = true
        customer.friday = true
  
      }
    }
    return customers
  }

module.exports = router;
