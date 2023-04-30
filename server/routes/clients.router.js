const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const {
  rejectUnauthorized,
} = require('../modules/authorization-middleware');


/**
 * GET all clients and their dogs
 */
router.get('/', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  //console.log('arrived in server get all route')
  const queryText = `
                    SELECT clients.first_name, clients.id as client_id, clients.qb_id, clients.last_name, clients.notes, clients.phone, clients.mobile, clients.email, clients.lat, clients.long, routes.id as route,

                    routes.name as route_name, clients.street, clients.city, clients.zip, dogs.name as dog_name, dogs.id as dog_id, dogs.image, dogs.vet_name, dogs.notes as dog_notes, 
                    dogs.vet_phone, dogs.flag, dogs.regular, dogs.active, clients_schedule."1" as monday, clients_schedule."2" as tuesday, clients_schedule."3" as wednesday, clients_schedule."4" as thursday, clients_schedule."5" as friday from clients
                            JOIN dogs
                            ON clients.id = dogs.client_id
                            JOIN routes
                            ON clients.route_id=routes.id
                            JOIN clients_schedule
                            ON clients.id = clients_schedule.client_id
                            ORDER BY clients.last_name ASC
;
  `
  pool.query(queryText)
    .then(result => {
      // console.log('what comes back from query?', result.rows)
      //all IDs from database
      let idArray = [];
      for (let object of result.rows) {
        // console.log(object.id)
        idArray.push(object.client_id)
      }

      //this filters out duplicate IDs
      let uniqueIds = [...new Set(idArray)]

      //this groups result.rows by id
      const group = result.rows.reduce((acc, item) => {
        if (!acc[item.client_id]) {
          acc[item.client_id] = [];
        }

        acc[item.client_id].push(item);
        return acc;
      }, {})
      // console.log(result.rows);
      // console.log(group)
      let clients = [];


      for (let i = 0; i < uniqueIds.length; i++) {
        let forDogMap = group[uniqueIds[i]]

        // const {first_name, last_name, address} = result.rows[0];
        const { first_name, last_name, street, city, zip, client_id, qb_id, phone, mobile, email, notes, vet_name, vet_phone, route, route_name, monday, tuesday, wednesday, thursday, friday, lat, long } = forDogMap[0];
        const client = { first_name, last_name, street, city, zip, client_id, qb_id, phone, mobile, email, notes, vet_name, vet_phone, route, route_name, monday, tuesday, wednesday, thursday, friday, lat, long }
        let dogsPreFilter = forDogMap.map(dog => { return ({ client_id: client_id, qb_id: qb_id, dog_name: dog.dog_name, image: dog.image, dog_id: dog.dog_id, dog_notes: dog.dog_notes, flag: dog.flag, regular: dog.regular, active: dog.active}) })


       const dogsResult = dogsPreFilter.filter(dog => dog.active === true)
      //  console.log ('dogs array?', dogsResult)
       
       //add dogs to client
        client.dogs = dogsResult
        
        clients.push(client)

      }
      res.send(clients);
      // console.log(clients)
    })
    .catch(err => {
      console.log('Error getting clients list for client list component', err);
      res.sendStatus(500);
    })
});

/**
 * POST route for initially adding a client
 */
router.post('/', rejectUnauthenticated, async (req, res) => {
  // console.log(req.body);
  // console.log(req.user);
  const client = await pool.connect()
  
  // necessary for SSL/bitio stuff?
    // .then(client => {
    //   console.log('connected')
    //   client.release()
    // })
    // .catch(err=> console.error('error connecting'), err.stack)
    // .then(()=> pool.end());

  const { first_name, last_name, street, city, zip, email, route_id, phone, dogs, schedule, notes, vet_name, vet_phone, flag } = req.body
  // const customer = {first_name, last_name, address, phone, email, route_id}
  const dogArray = dogs
  // const vet = {vet_name, vet_phone}
  // console.log('in client POST route');


  try {

    //geocoding for client
    const api_key = process.env.map_api_key;
    const config = { headers: { Authorization: api_key } };

    const address = street.replace(/ /g, "+");
    const town = city.replace(/ /g, '');

    const geoStats = await axios.get(`https://api.radar.io/v1/geocode/forward?query=${address}+${town}+${zip}`, config);

    const lat = geoStats.data.addresses[0].latitude;
    const long = geoStats.data.addresses[0].longitude;
    // const lat = 0;
    // const long = 0;
    console.log('heres the geoStats!', lat, long);

    await client.query('BEGIN')
    const clientTxt = await client.query(`
                          INSERT INTO clients 
                            ("first_name", "last_name", "street", "city", "zip", "route_id", "phone", "email", "notes", "lat", "long") 
                            VALUES
                            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                            RETURNING "id";
  `, [first_name, last_name, street, city, zip, route_id, phone, email, notes, lat, long])
    const customerId = clientTxt.rows[0].id
    console.log('DOG ARRAY IS:', dogArray);
    await Promise.all(dogArray.map(dog => {
      const dogTxt = `
                          INSERT INTO dogs 
                              ("client_id", "name", "image", "vet_name", "vet_phone", "notes", "flag", "regular") 
                            VALUES
                              ($1, $2, $3, $4, $5, $6, $7, $8)

      `
      const dogValues = [customerId, dog.dog_name, dog.image, vet_name, vet_phone, dog.dog_notes, dog.flag, dog.regular]
      return client.query(dogTxt, dogValues)
    }));
    const scheduleTxt = `
                            INSERT INTO clients_schedule
                            ("client_id", "1", "2", "3", "4", "5")
                            VALUES
                            ($1, $2, $3, $4, $5, $6)
    `
    const dayValues = [customerId, schedule[1], schedule[2], schedule[3], schedule[4], schedule[5]]
    await client.query(scheduleTxt, dayValues)
    await client.query('COMMIT')
    res.sendStatus(201);
  } catch (error) {
    await client.query('ROLLBACK')
    console.log('Error in post route for add client', error);
    res.sendStatus(500);
  } finally {
    client.release()
  }
});

//route to edit client
router.put('/', rejectUnauthenticated, rejectUnauthorized, async (req, res) => {
  // console.log('client in put route:', req.body)
  const connection = await pool.connect();
  let { first_name, last_name, street, city, zip, client_id, phone, email, notes, vet_name, vet_phone, route, route_name, dogs } = req.body
  //  console.log('dogs array?', dogs)
  //logic to convert string into correct form for database
  if (route_name === 'Tangletown') {
    route = 1;
  } else if (route_name === 'Emerson') {
    route = 2
  } else if (route_name === 'Far') {
    route = 3
  } else if (route_name === 'Misfits') {
    route = 4
  } else {
    route = 5
  }
  // console.log('does route change?', route)
  //SQL text for updating client table
  const clientTxt = `
            UPDATE clients
                SET
                  street = $1, 
                  city = $2,
                  zip = $3,
                  route_id = $4,
                  phone= $5,
                  email = $6,
                  notes = $7
              
                WHERE
                  id = $8;

  `
  const clientValues = [street, city, zip, route, phone, email, notes, client_id]
  // console.log(clientValues)
  try {
    await connection.query('BEGIN');
    await connection.query(clientTxt, clientValues)
    await Promise.all(dogs.map(dog => {
      //update for Vet/vet phone only
      const dogTxt = `
      UPDATE dogs
        SET
          vet_name = $1,
          vet_phone = $2

        WHERE id =$3;
    `
      const dogValues = [vet_name, vet_phone, dog.dog_id]
      // console.log('dog values?', dogValues)
      // console.log('dog values?', dog.dog_id)
      return connection.query(dogTxt, dogValues)
    }));
    await connection.query('COMMIT')
    res.sendStatus(201);
  } catch (dbErr) {
    console.log('Error in PUT route', dbErr)
    await connection.query('ROLLBACK');
    res.sendStatus(500);
  }
});

//route to edit dog
router.put('/dogs', rejectUnauthenticated, rejectUnauthorized, async (req, res) => {
   console.log('dogs have id?', req.body)
   console.log(typeof(req.body.regular))
  const { dog_name, dog_notes, flag, regular, dog_id } = req.body

  const dogTxt = `
            UPDATE dogs
                SET
                  name = $1, 
                  notes = $2,
                  flag = $3,
                  regular = $4
              
                WHERE
                  id = $5;

  `
  const dogValues = [dog_name, dog_notes, flag, regular, dog_id]
  try {
    pool.query(dogTxt, dogValues)
    res.sendStatus(201);
  } catch (dbErr) {
    console.log('Error in PUT route for one dog', dbErr)
    res.sendStatus(500);
  }
});

//adding one dog
router.post('/dog', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  // console.log(req.body)
  const { vet_name, vet_phone, dog_name, dog_notes, image, client_id, flag } = req.body

  try {
    const dogTxt = `
            INSERT INTO dogs 
              ("client_id", "name", "image", "vet_name", "vet_phone", "notes", "flag") 
              VALUES
              ($1, $2, $3, $4, $5, $6, $7) ;
  `
    const dogValues = [client_id, dog_name, image, vet_name, vet_phone, dog_notes, flag]
    pool.query(dogTxt, dogValues)
    res.sendStatus(201);
  } catch (error) {
    console.log('Error adding new dog to client', error)
    res.sendStatus(500);
  }
});


router.get('/:id', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  console.log('arrived in server get one route', req.params)
  let clientId = req.params.id
  const queryText = `

    SELECT clients.first_name, clients.id as client_id, clients.last_name, clients.notes, clients.phone, clients.mobile, clients.email, clients.lat, clients.long, routes.id as route,
    routes.name as route_name, clients.street, clients.city, clients.zip, dogs.name as dog_name, dogs.id as dog_id, dogs.image, dogs.vet_name, 
    dogs.vet_phone, dogs.notes as dog_notes, dogs.flag, dogs.regular, dogs.active,
   clients_schedule."1", clients_schedule."2", clients_schedule."3", clients_schedule."4", clients_schedule."5"  
    from clients
            JOIN dogs
            ON clients.id = dogs.client_id
            JOIN routes
            ON clients.route_id=routes.id
            JOIN clients_schedule
            ON clients.id = clients_schedule.client_id
            WHERE clients.id = $1
            ORDER BY dogs.id;
 
  ;
    `
  const queryValues = [clientId]
  pool.query(queryText, queryValues)
    .then(result => {
       console.log('how to target schedule?', result.rows[0])
      // console.log(result.rows[0][1])

      //all IDs from database
      let idArray = [];
      for (let object of result.rows) {
         console.log('id here?', object.client_id)
        idArray.push(object.client_id)
      }

      //this filters out duplicate IDs
      let uniqueIds = [...new Set(idArray)]

      //this groups result.rows by id
      const group = result.rows.reduce((acc, item) => {
        if (!acc[item.client_id]) {
          acc[item.client_id] = [];
        }

        acc[item.client_id].push(item);
        return acc;
      }, {})
      // console.log(result.rows);
      console.log('group here', group)
      let clients = [];


      for (let i = 0; i < uniqueIds.length; i++) {
        let forDogMap = group[uniqueIds[i]]

       console.log('id here', forDogMap[0])

        const { first_name, last_name, street, city, zip, client_id, phone, mobile, email, notes, vet_name, vet_phone, route, route_name, lat, long } = forDogMap[0];
        const client = { first_name, last_name, street, city, zip, client_id, phone, mobile, email, notes, vet_name, vet_phone, route, route_name, lat, long }
        let dogsPreFilter = forDogMap.map(dog => { return ({client_id:client_id, dog_name: dog.dog_name, image: dog.image, dog_id: dog.dog_id, dog_notes: dog.dog_notes, flag: dog.flag, regular: dog.regular, active: dog.active}) })

       const dogsResult = dogsPreFilter.filter(dog => dog.active === true)
       console.log ('dogs array?', dogsResult)
       
       //add dogs to client
        client.dogs = dogsResult
        
        clients.push(client)

      }
      res.send(clients);
      // console.log('does it get one?', clients)
    })
    .catch(err => {
      console.log('Error getting one client', err);
      res.sendStatus(500);
    })
});

router.get('/schedule/:id', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  // console.log('arrived in server get schedule route', req.params.id)
  let clientId = req.params.id
  const queryText = `
            SELECT * FROM clients_schedule
                WHERE client_id =$1;
  `
  const queryValues = [clientId]
  pool.query(queryText, queryValues)
    .then(result => {

      // console.log('result from query?', result.rows)


      res.send(result.rows);

    })
    .catch(err => {
      console.log('Error getting one client', err);
      res.sendStatus(500);
    })
});

//this is for one off schedule changes

router.post('/schedule', rejectUnauthenticated, async (req, res) => {

 // console.log('one off change', req.body)

  const client = await pool.connect();
  // const {date, is_scheduled, dog_id, client_id } = req.body
  // const schedule = req.body
  try {
    await client.query('BEGIN')
    await Promise.all(req.body.map(scheduleChange => {
      const scheduleTxt = `
                          INSERT INTO dogs_schedule_changes 
                              ("dog_id", "client_id", "date_to_change", "is_scheduled") 
                            VALUES
                              ($1, $2, $3, $4)
                            ON CONFLICT (dog_id, date_to_change)
                            DO UPDATE SET "is_scheduled" = $4;

      `
      const scheduleValues = [scheduleChange.dog_id, scheduleChange.client_id, scheduleChange.date_to_change, scheduleChange.is_scheduled]
      return client.query(scheduleTxt, scheduleValues)
    }));
    await client.query('COMMIT')
    res.sendStatus(201);
  } catch (error) {
    await client.query('ROLLBACK')
    console.log('Error in post route for schedule changes', error);
    res.sendStatus(500);
  } finally {
    client.release()
  }
});

// Updating schedule changes
router.put('/schedule/updated', rejectUnauthenticated, async (req, res) => {

   console.log('one off change', req.body)

  const client = await pool.connect();
  // const {date, is_scheduled, dog_id, client_id } = req.body
  // const schedule = req.body
  try {
    await client.query('BEGIN')
    await Promise.all(req.body.map(change => {
      const scheduleTxt = `
                          UPDATE dogs_schedule_changes
                          SET is_scheduled = $1
                          WHERE dog_id = $2 AND date_to_change = $3;
                          `
      const scheduleValues = [change.is_scheduled, change.dog_id, change.date_to_Change]
      return client.query(scheduleTxt, scheduleValues)
    }));
    await client.query('COMMIT')
    res.sendStatus(201);
  } catch (error) {
    await client.query('ROLLBACK')
    console.log('Error in post route for schedule changes', error);
    res.sendStatus(500);
  } finally {
    client.release()
  }
});


router.delete('/:id', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  // console.log(req.params.id)

  const queryText = 'DELETE FROM clients WHERE id=$1';
  pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing delete client query', err);
      res.sendStatus(500);
    });
});

router.put('/dogs/:id', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  // console.log(req.params.id)

  const queryText = `
                UPDATE dogs
                      SET active = false
                      WHERE id = $1;
  `;
  pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing delete dog query', err);
      res.sendStatus(500);
    });
});

//route to edit regular schedule
router.put('/schedule', rejectUnauthenticated, rejectUnauthorized, async (req, res) => {
  // console.log('schedule as it arrives in server: ', req.body["1"])

  const scheduleTxt = `
            UPDATE clients_schedule
                SET
                  "1" = $1, 
                  "2" = $2,
                  "3" = $3,
                  "4" = $4,
                  "5" = $5
              
                WHERE
                  client_id = $6;

  `
  const scheduleValues = [req.body["1"], req.body["2"], req.body["3"], req.body["4"], req.body["5"], req.body.client_id,]
  try {
    pool.query(scheduleTxt, scheduleValues)
    res.sendStatus(201);
  } catch (dbErr) {
    console.log('Error in PUT route for regular schedule', dbErr)
    res.sendStatus(500);
  }
});





module.exports = router;
