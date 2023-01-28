const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const tools = require('../modules/tools')
const config = require('../../config.json');
const request = require('request');
const router = express.Router();

router.get('/customer', (req, res) => {
  console.log('in server fetch customers')
  const token = tools.getToken(req.session)
  console.log('token?', token.accessToken)
  console.log('basic auth', tools.basicAuth)

  const query = encodeURI('/query?query= select * from customer');
  const url = config.api_uri + req.session.realmId + query
  console.log('Making API Customer call to: ' + url)
  
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
        res.send('connectToQB')

        // don't know if this second else-if block is necessary, ie, covering non-401 errors.
      } else if (err || response.statusCode != 200) {
        return res.json({ error: err, statusCode: response.statusCode })
      } else {
     
        // we could organize this into to different modules based on the request type; ie, req.body? there will be multiple API calls?git ci
        // console.log("response with fresh auth", response)
        let customers = JSON.parse(response.body)
        // console.log(customers)
        // this function starts the process of formatting the customers
        let filteredCustomers =  filterCustomers(customers)
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
    //one more filter to remove key no longer needed on object
    let finalCustomers = customersWithSchedule.filter(customer => delete customer.notesObj);
    return finalCustomers;
    //Note: During merge - need to test if the above works
  }
  
  function getDogSchedule(customers) {
  //  console.log('customers:', customers)
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
                vet_phone: "",
                qb_id: oneCustomer.qb_id
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
    // console.log('does it add client_id', customersResult)
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


  router.put('/customer/put', async (req, res) => {
    let qbData = req.body.qb
    // console.log('looking for schedule info', qbData)
    let dbData = req.body.db

    let customersWithSchedule = processSchedule(qbData)
    qbData = customersWithSchedule
    // console.log('customers with schedule', qbData)
    let customersAddDogs = []
    let customersDeleteDogs = []
    let customerNoDogChange = []
    
    for(let qbCustomer of qbData){
      for (let dbCustomer of dbData){
        // console.log(' are dogs here', dbCustomer.dogs)
        if (qbCustomer.qb_id === dbCustomer.qb_id) {
          if(qbCustomer.dogs.length > dbCustomer.dogs.length ){
          // console.log('dogs at this moment?', qbCustomer.dogs)
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
      console.log('dogs at this point?', processedCustomersAddDogs)
    for(let oneCustomer of processedCustomersAddDogs){
      console.log(oneCustomer.dogsToAdd)
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




module.exports = router;
