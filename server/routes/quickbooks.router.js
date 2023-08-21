const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const tools = require('../modules/tools');
const config = require('../modules/config');
const request = require('request');
const router = express.Router();

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/*The main route to get QB customers from QB after OAuth is completed */
router.get('/customer', rejectUnauthenticated, (req, res) => {
  console.log('in server fetch customers')
  const token = tools.getToken(req.session)
 // console.log('token?', token.accessToken)
  //console.log('basic auth', tools.basicAuth)

  if(token) {

    const query = encodeURI('/query?query= select * from customer');
    const url = config.api_uri + req.session.realmId + query
     //console.log('Making API Customer call to: ' + url)
    // tools.refreshTokensWithToken(token.refreshToken)

    const requestObj = {
      url: url,
      headers: {
        'Authorization': 'Bearer ' + token.accessToken,
        'Accept': 'application/json'
      }
    }
    
    request(requestObj, function (err, response) { 
      // checks current access token. If access token is expired, it renews access token with stored refresh token.

      tools.checkForUnauthorized(req, requestObj, err, response).then(async function ({ err, response }) {
          // status code 401 corrosponds to unauthorized request.
          // in future testing. 'invalid_grant' also occurs;; err.body.error ;; when should we specify?
        if (response.statusCode === 401 ) {
        
          // If unauthorized, send this command back to client. if fetchQbCustomers in quickbooks.saga.js recieves command, client redirects to /connect_to_qb route.
          res.send('connectToQb')

          // don't know if this second else-if block is necessary, ie, covering non-401 errors.
        } else if (err || response.statusCode != 200) {
          console.log('error in customer request', response.statusCode);
          return res.json({ error: err, statusCode: response.statusCode })
        } else {
      
          //initial response from QB servers
          let customers = JSON.parse(response.body)
      
          // this function starts the process of formatting the customers
          let filteredCustomers =  filterCustomers(customers)
       //sends customers to client side after processing
          res.send(filteredCustomers)
        }   
      }, function (err) {
        console.log('error in customer request')
        return res.json(err)
      })
    })
  } else {
    console.log('null token');
    res.send('connectToQb');
  }
})

//this function processes the QB customers into a data object that matches our DB object
  function filterCustomers(customers) {
    //console.log('customers straight from QB', customers)
    let customerArray = customers.QueryResponse.Customer 
    let customersAfterProcessing = []
    for (let oneCustomer of customerArray) {
      let customer = {
        qb_id: Number(oneCustomer.Id),
       // notesObj: oneCustomer.Notes,
        email: oneCustomer.PrimaryEmailAddr.Address,
        first_name: oneCustomer.GivenName,
        last_name: oneCustomer.FamilyName,
        street: oneCustomer.BillAddr.Line1,
        city: oneCustomer.BillAddr.City,
        zip: oneCustomer.BillAddr.PostalCode,
        notes: oneCustomer.ShipAddr.Line1,
      }

      //adds keys if they apply to that customer
      if(oneCustomer.hasOwnProperty('Notes')){
        customer.notesObj = oneCustomer.Notes  //added this check to handle
      } else {                                      //customers with only ad-hoc dogs
        customer.notesObj = "none-none"
      }
      if(oneCustomer.hasOwnProperty('Mobile')){
        customer.mobile = oneCustomer.Mobile.FreeFormNumber   //some customers don't have mobile
      } else {                                      //this handles undefined errors
        customer.mobile = ""
      }
      if(oneCustomer.hasOwnProperty('PrimaryPhone')){
        customer.phone = oneCustomer.PrimaryPhone.FreeFormNumber   //some customers don't have phones
      } else {                                      //this handles undefined errors
        customer.phone = ""
      }
      if(oneCustomer.ShipAddr.hasOwnProperty('City')){   //where Lisa stores ad-hoc dog info
        customer.adHocDogs =oneCustomer.ShipAddr.City
      }
      if(!oneCustomer.hasOwnProperty('route_id')){
        customer.route_id = 5      //adds a default route_id of unassigned
                           //QB doesn't have route data but it is needed 
      }
      customersAfterProcessing.push(customer)
    }
    // this next function deals with dogs' names and schedules 
   // console.log('does it add a none-none key?', customersAfterProcessing)
    let customersWithSchedule = getDogSchedule(customersAfterProcessing)
    //one more filter to remove key no longer needed on object
    let preFinalCustomers = customersWithSchedule.filter(customer => delete customer.notesObj);
    let finalCustomers = customersWithSchedule.filter(customer => delete customer.adHocDogs);
    return finalCustomers;
  }
  
  //this function processes the string with dog info and schedules and turns
  //it into usable data
  function getDogSchedule(customers) {
   //console.log('customers:', customers)
    let customerArray = []
    for (let oneCustomer of customers) {
      let result = oneCustomer.notesObj.split("-")
      let dogs = result[0]
      let schedule = result[1]
      let dogsCleaned = dogs.replace(/[&/]/g, ",")
      let scheduleCleaned = schedule.replace(/[&/]/g, ",")
      
      //this sections gets rid of extra spaces that might be surrounding each string 
      let dogsArray = dogsCleaned.split(",").map(function (dogName) {
        return {name: dogName.trim(), 
                notes: "", 
                flag: false, 
                active: true, 
                regular: true,     //creating a dog object for each dog
                image: "",
                // vet_name: "",
                // vet_phone: "",
                qb_id: oneCustomer.qb_id
              };
      })

      //for ad-hoc dogs
        if(oneCustomer.hasOwnProperty('adHocDogs')){
          // console.log('do ad hoc dogs make it here?', oneCustomer.adHocDogs )
          let adHocDogsString = oneCustomer.adHocDogs
          let dogsCleaned = adHocDogsString.replace(/[&/]/g, ",")
          let adHocDogsArray = dogsCleaned.split(",").map(function (dogName) {
            let adHocDog = {
                    name: dogName.trim(), 
                    notes: "", 
                    flag: false, 
                    active: true, 
                    regular: false,     //creating a dog object for each  ad hoc dog
                    image: "",
                    // vet_name: "",
                    // vet_phone: "",
                    qb_id: oneCustomer.qb_id
            }
              //adds the dogs to the array with regular dogs
                  dogsArray.push(adHocDog)
          })
        }
        let scheduleArray = scheduleCleaned.split(",").map(function (dayName) {
        return dayName.trim();
      })
        let filteredDogs = dogsArray.filter(dog => dog.name != "none")
        //console.log('filtered dogs', filteredDogs)
        oneCustomer.dogs = filteredDogs,   //adding dogs key to customer object
        oneCustomer.schedule =  scheduleArray, //adding schedule key to customer obj
        customerArray.push(oneCustomer)
      
    }
      return customerArray
  
  }

/*To initially add QB customers to DB */
router.post('/qbcustomers', rejectUnauthenticated, async (req, res) => {
  console.log('in quickbooks/qbcustomer');

  const client = await pool.connect();
  const customers = req.body // obj desctructing of QB data
    //geocoding for customers
  
  const api_key = process.env.map_api_key;
  const config = { headers: { Authorization: api_key } };


  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  //we had to add this function to slow down requests to radar api
  //they have a request limit of 10 per second
  async function GetGeoStats(customers) {
    const customerResult = []
    for(let customer of customers){
    const address = customer.street.replace(/ /g, "+");
    const town = customer.city.replace(/ /g, '');
    const zip = customer.zip
    const geoStats = await axios.get(`https://api.radar.io/v1/geocode/forward?query=${address}+${town}+${zip}`, config);
    const lat = geoStats.data.addresses[0].latitude;
    const long = geoStats.data.addresses[0].longitude;
    customer.lat = lat
    customer.long = long
    await delay(100);
    customerResult.push(customer)
    // console.log('testing geo stats', customer)
    }
    return customerResult;
  }

  // returns TRUE if a address or town field is empty
  let missingList = [];
  const checkCustomerAddressFields = (customers) => {
  for (let client of customers) {
    if (!client.street || !client.city) {
      const name = `${client.first_name} ${client.last_name}`;
      missingList.push(name);
    }
  }
  return customers.some(customer => !customer.street || !customer.city);
  }

  let customersWithGeoStats
  if (!checkCustomerAddressFields(customers)) {
    console.log('no fields empty')
    customersWithGeoStats = await GetGeoStats(customers)
  } else {
    // console.log('some fields empty', missingList)
    const message = {message: `Error! The following customers are missing address fields: ${missingList.join(' ')}`}
    return res.status(500).send(message);
  }

  let customersResult = processSchedule(customersWithGeoStats)
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
  // console.log('does it add client_id', customersResult)
  for(let eachCustomer of customersResult){
    await Promise.all(eachCustomer.dogs.map(dog => {
      const dogTxt = `
                          INSERT INTO dogs 
                              ("client_id", "name", "image", "notes", "flag", "regular", "active") 
                            VALUES
                              ($1, $2, $3, $4, $5, $6, $7)

      `
      const dogValues = [eachCustomer.client_id, dog.name, dog.image, dog.dog_notes, dog.flag, dog.regular, dog.active]
      return client.query(dogTxt, dogValues)
    }));
  }
  for(let eachCustomer of customersResult) {
      const scheduleTxt = `
                            INSERT INTO clients_schedule
                            ("client_id", "qb_id", "1", "2", "3", "4", "5")  
                            VALUES
                            ($1, $2, $3, $4, $5, $6, $7)
`
      const dayValues = [eachCustomer.client_id, eachCustomer.qb_id, eachCustomer.monday, eachCustomer.tuesday, 
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
  // console.log('in function to process schedules', customers)

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
    if(schedule.includes('daily')){
      customer.monday = true
      customer.tuesday = true
      customer.wednesday = true
      customer.thursday = true
      customer.friday = true
    }
    if(schedule.includes('None')){
      customer.monday = false
      customer.tuesday = false
      customer.wednesday = false
      customer.thursday = false
      customer.friday = false
    }
    if(schedule.includes('none')){
      customer.monday = false
      customer.tuesday = false
      customer.wednesday = false
      customer.thursday = false
      customer.friday = false

    }
  }
  return customers
}


  router.put('/customer/put', rejectUnauthenticated, async (req, res) => {
    let qbData = req.body.qb
    // console.log('looking for schedule info', qbData)
    let dbData = req.body.db

    let customersWithSchedule = processSchedule(qbData)
    qbData = customersWithSchedule
  
    //arrays for customers with regular dog changes (or not)
    let customersAddDogs = []
    let customersDeleteDogs = []
    let customerNoDogChange = []

    for(let qbCustomer of qbData){
      for (let dbCustomer of dbData){
        // console.log(' are dogs here', dbCustomer.dogs)
        if (qbCustomer.qb_id === dbCustomer.qb_id) {
          if(qbCustomer.dogs.length > dbCustomer.dogs.length ){
          customersAddDogs.push(qbCustomer)
          }
          else if(qbCustomer.dogs.length < dbCustomer.dogs.length ){
            customersDeleteDogs.push(qbCustomer)
          }
          else {
            customerNoDogChange.push(qbCustomer)
          }
        }
      }
    } //end of outermost for loop

    
    /* These two functions prepare the customer objects for SQL (if dogs were added or deleted) */
    let processedCustomerDeleteDogs = getDogIdToDelete(customersDeleteDogs, dbData)
    let processedCustomersAddDogs =  getDogToAdd(customersAddDogs, dbData)
    /* Will loop through for each customer and by type */
    const connection = await pool.connect();
      await connection.query('BEGIN');
    try {
      //updating client details for customers without dog changes
      for(let regCustomer of customerNoDogChange ){
        const clientTxt = `
        UPDATE clients
            SET
              street = $1, 
              city = $2,
              zip = $3,
              phone= $4,
              mobile = $5,
              email = $6,
              notes = $7
          
            WHERE
              qb_id = $8;

    `
    const clientValues = [regCustomer.street, regCustomer.city, regCustomer.zip, regCustomer.phone, regCustomer.mobile,
                                regCustomer.email, regCustomer.notes, regCustomer.qb_id]
    await connection.query(clientTxt, clientValues)
  //updating client details for customers where dog is added
      for(let addCustomer of processedCustomersAddDogs){
        const clientTxt = `
        UPDATE clients
            SET
              street = $1, 
              city = $2,
              zip = $3,
              phone= $4,
              mobile = $5,
              email = $6,
              notes = $7
          
            WHERE
              qb_id = $8;

    `
          const clientValues = [addCustomer.street, addCustomer.city, addCustomer.zip, addCustomer.phone, addCustomer.mobile,
                                addCustomer.email, addCustomer.notes, addCustomer.qb_id]
          await connection.query(clientTxt, clientValues)
      }
 //for customers where dogs will be deleted
      for(let deleteCustomer of processedCustomerDeleteDogs){
        const clientTxt = `
        UPDATE clients
            SET
              street = $1, 
              city = $2,
              zip = $3,
              phone= $4,
              mobile = $5,
              email = $6,
              notes = $7
          
            WHERE
              qb_id = $8;

    `
          const clientValues = [deleteCustomer.street, deleteCustomer.city, deleteCustomer.zip, deleteCustomer.phone, deleteCustomer.mobile,
                                deleteCustomer.email, deleteCustomer.notes, deleteCustomer.qb_id]
          await connection.query(clientTxt, clientValues)
      }
      
  }

  //updating client schedule for clients that did not have dog changes
  for(let regCustomer of customerNoDogChange ){
            const scheduleTxt = `
            UPDATE clients_schedule
                SET
                  "1" = $1, 
                  "2" = $2,
                  "3" = $3,
                  "4" = $4,
                  "5" = $5
              
                WHERE
                  qb_id = $6;

          `
    const scheduleValues = [regCustomer.monday, regCustomer.tuesday, regCustomer.wednesday, regCustomer.thursday, regCustomer.friday, regCustomer.qb_id]
    await connection.query(scheduleTxt, scheduleValues)
  }
  //updating client schedule for clients that added dogs
  for(let addCustomer of customersAddDogs ){
          const scheduleTxt = `
          UPDATE clients_schedule
              SET
                "1" = $1, 
                "2" = $2,
                "3" = $3,
                "4" = $4,
                "5" = $5
            
              WHERE
                qb_id = $6;

        `
    const scheduleValues = [addCustomer.monday, addCustomer.tuesday, addCustomer.wednesday, addCustomer.thursday, addCustomer.friday, addCustomer.qb_id]
    await connection.query(scheduleTxt, scheduleValues)
}

//updating client schedule for clients that deleted dogs
for(let deleteCustomer of customersDeleteDogs){
      const scheduleTxt = `
      UPDATE clients_schedule
          SET
            "1" = $1, 
            "2" = $2,
            "3" = $3,
            "4" = $4,
            "5" = $5
        
          WHERE
            qb_id = $6;

    `
const scheduleValues = [deleteCustomer.monday, deleteCustomer.tuesday, deleteCustomer.wednesday, deleteCustomer.thursday, deleteCustomer.friday, deleteCustomer.qb_id]
await connection.query(scheduleTxt, scheduleValues)
}
  if(processedCustomersAddDogs.length === 0){
    console.log('No dogs need to be added')
    } else {
      // console.log('dogs at this point?', processedCustomersAddDogs)
    for(let oneCustomer of processedCustomersAddDogs){
      // console.log(oneCustomer.dogsToAdd)
      await Promise.all(oneCustomer.dogsToAdd.map(dog => {
    
      const dogTxt = `
              INSERT INTO dogs 
                ("client_id", "name", "active", "regular") 
              VALUES
                ($1, $2, $3, $4);
      `
        const dogValues = [dog.client_id, dog.name, dog.active, dog.regular]
          // console.log('dog values?', dogValues)
          // console.log('dog values?', dog.dog_id)
          return connection.query(dogTxt, dogValues)
      }));
}} //end of if/else block for adding dogs

/*For deleting dogs from a customer */
if(processedCustomerDeleteDogs.length === 0){
    console.log('No dogs need to be deleted')
  } else {
  for(let oneCustomer of processedCustomerDeleteDogs){
    console.log(oneCustomer)
    await Promise.all(oneCustomer.dogDeleteIds.map(dog => {

    const dogTxt = `
            UPDATE dogs
                  SET active = false
                  WHERE id = $1;
    `
      const dogValues = [dog.dog_id]
      return connection.query(dogTxt, dogValues)
    }));
}}
    await connection.query('COMMIT')
    res.sendStatus(201);
  } catch (dbErr) {
    console.log('Error in PUT route', dbErr)
    await connection.query('ROLLBACK');
    res.sendStatus(500);
  }  finally {
    connection.release()
    console.log('connection release');
  }
  });

  
  function getDogIdToDelete (customers, dbData) {
    let processedCustomers = []
      for(let customer of customers ){
        let qbDogs = customer.dogs
        for(let dbVersion of dbData){
                if(customer.qb_id === dbVersion.qb_id){
                  let dbDogs = dbVersion.dogs
                  // console.log('database dogs', dbDogs)
                  // console.log('quickbooks dogs', qbDogs)
                  function resultFilter(dbDogs, qbDogs) {
                    return dbDogs.filter(dbDogsItem =>
                      !qbDogs.some(
                        qbDogItem => dbDogsItem.dog_name === qbDogItem.name
                      )
                    );
                  };
                  let dogToDelete = resultFilter(dbDogs, qbDogs)
                  // console.log('dog to delete', dogToDelete) //array of dog objects to be deleted
                customer.dogDeleteIds = dogToDelete    //adding a new property that includes the objects of dogs to be deleted
                customer.client_id = dbVersion.client_id //adding client ID to the dog object
                }
              }
            processedCustomers.push(customer) //for each customer that goes through the process
      }
      // console.log(processedCustomers)
      return processedCustomers //returning customers back up to the original route
  }

  function getDogToAdd (customers, dbData) {
    let processedCustomers = []
    for(let customer of customers ){
      let qbDogs = customer.dogs
      for(let dbVersion of dbData){
              if(customer.qb_id === dbVersion.qb_id){
                let dbDogs = dbVersion.dogs
                // console.log('database dogs', dbDogs)
                // console.log('quickbooks dogs', qbDogs)
                function resultFilter(dbDogs, qbDogs) {
                  return qbDogs.filter(qbDogsItem =>
                    !dbDogs.some(
                      dbDogItem => qbDogsItem.name === dbDogItem.dog_name
                    )
                  );
                };
              let dogsToAdd = resultFilter(dbDogs, qbDogs)   //array of dog objects to be added
              for(let eachDog of dogsToAdd){
                eachDog.client_id = eachDog.client_id = dbVersion.client_id
              }
              customer.dogsToAdd = dogsToAdd    //adding a new property that includes the objects of dogs to be added
              customer.client_id = dbVersion.client_id //adding DB ID to the dog object
              }
            }
          processedCustomers.push(customer) //for each customer that goes through the process
    }
    // console.log(processedCustomers)
    return processedCustomers //returning customers back up to the original route
  }

/* Route to delete DB customers that are no longer active on QB */
router.delete('/delete', async (req, res) => {
  console.log('does it hit server?')
  const deleteArray = req.query.ids.split(",")
  let idsToDelete = deleteArray.map(id => Number(id))
  const connection = await pool.connect();
    try {
      await connection.query('BEGIN');
      await Promise.all(idsToDelete.map(id => {
        const queryText = 'DELETE FROM clients WHERE qb_id=$1';
        // console.log(id)
        return connection.query(queryText, [id])
      }));
      await connection.query('COMMIT')
      res.sendStatus(201);
    } catch (dbErr) {
      console.log('Error in delete DB route', dbErr)
      await connection.query('ROLLBACK');
      res.sendStatus(500);
    } finally {
      connection.release();
      console.log('connection release');
    }
  });

module.exports = router;
