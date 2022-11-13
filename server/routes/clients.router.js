const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');


/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
//   console.log('arrived in server get all route')
  const queryText = `
                    SELECT clients.first_name, clients.id, clients.last_name, clients.notes, clients.phone, clients.email, routes.id as route,
                    routes.name as route_name, clients.street, clients.city, clients.zip, dogs.name as dog_name, dogs.id as dog_id, dogs.image, dogs.vet_name, dogs.vet_phone from clients
                            JOIN dogs
                            ON clients.id = dogs.client_id
                            JOIN routes
                            ON clients.route_id=routes.id
                            ORDER BY clients.last_name ASC
;
;
  `
pool.query(queryText)
    .then(result => {
    
        //all IDs from database
        let idArray = [];
            for(let object of result.rows){
                // console.log(object.id)
                idArray.push(object.id)
            }
      
      //this filters out duplicate IDs
      let uniqueIds = [...new Set(idArray)]

    //this groups result.rows by id
      const group = result.rows.reduce((acc, item) => {
        if (!acc[item.id]) {
          acc[item.id] = [];
        }
        
        acc[item.id].push(item);
        return acc;
      }, {})
        // console.log(result.rows);
        // console.log(group)
        let clients = [];

        
        for (let i = 0; i<uniqueIds.length; i++){
            let forDogMap = group[uniqueIds[i]]
       
            // const {first_name, last_name, address} = result.rows[0];
            const {first_name, last_name, street, city, zip, id, phone, email, notes, vet_name, vet_phone, route, route_name} = forDogMap[0];
            const client = {first_name, last_name, street, city, zip, id, phone, email, notes, vet_name, vet_phone, route, route_name}
            client.dogs = forDogMap.map(dog => {return({dog_name: dog.dog_name, image: dog.image, dog_id: dog.dog_id})})

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
 * POST route template
 */
router.post('/', rejectUnauthenticated, async (req, res) => {
  // console.log(req.body);
  const client = await pool.connect();
  const {first_name, last_name, street, city, zip, email, route_id, phone, dogs, schedule, notes, vet_name, vet_phone } = req.body
  // const customer = {first_name, last_name, address, phone, email, route_id}
  const dogArray = dogs
  // const vet = {vet_name, vet_phone}
  // console.log ('vet', vet)
 

 
  try {
  await client.query('BEGIN')
  const clientTxt = await client.query(`
                          INSERT INTO clients 
                              ("first_name", "last_name", "street", "city", "zip", "route_id", "phone", "email", "notes") 
                            VALUES
                            ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                            RETURNING "id";
  `, [first_name, last_name, street, city, zip, route_id, phone, email, notes])
  const customerId = clientTxt.rows[0].id

  await Promise.all(dogArray.map(dog => { 
      const dogTxt = `
                          INSERT INTO dogs 
                              ("client_id", "name", "image", "vet_name", "vet_phone", "notes") 
                            VALUES
                              ($1, $2, $3, $4, $5, $6)

      `
      const dogValues = [customerId, dog.dog_name, dog.image, vet_name, vet_phone, dog.dog_notes]
      return client.query(dogTxt, dogValues)
  }));
    const scheduleTxt = `
                            INSERT INTO clients_schedule
                            ("client_id", "1", "2", "3", "4", "5")
                            VALUES
                            ($1, $2, $3, $4, $5, $6)
    `
      const dayValues = [customerId, schedule[1], schedule[2], schedule[3], schedule [4], schedule[5]]
      await client.query(scheduleTxt, dayValues )
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
router.put('/', rejectUnauthenticated, async (req, res) => {
  console.log('dogs have id?', req.body)
  const connection = await pool.connect();
  let {first_name, last_name, street, city, zip, id, phone, email, notes, vet_name, vet_phone, route, route_name, dogs} = req.body
 console.log('dogs array?', dogs)
  //logic to convert string into correct form for database
  if(route_name === 'tangletown'){
    route = 1;
  } else if (route_name === 'emerson'){
    route = 2
  } else if(route_name === 'far'){
    route = 3
  } else if(route_name === 'misfits'){
    route = 4
  } else {
    route = 5
  }
  // console.log(route)
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
  const clientValues = [street, city, zip, route, phone, email, notes, id]
  // console.log(clientValues)
  try{
    await connection.query('BEGIN');
    await connection.query(clientTxt, clientValues)
    await Promise.all(dogs.map (dog => {  
      //update for Vet/vet phone only
      const dogTxt = `
      UPDATE dogs
        SET
          vet_name = $1,
          vet_phone = $2

        WHERE id =$3;
    `
      const dogValues = [vet_name, vet_phone, dog.dog_id]
      console.log('dog values?', dogValues)
      console.log('dog values?', dog.dog_id)
      return connection.query(dogTxt, dogValues)
    }));
    await connection.query('COMMIT')
    res.sendStatus(201);
  } catch (dbErr){
    console.log('Error in PUT route', dbErr)
    await connection.query('ROLLBACK');
    res.sendStatus(500);
  }
});

router.post('/dog', rejectUnauthenticated, (req, res) => {
  console.log(req.body)
  const{vet_name, vet_phone, dog_name, dog_notes, image, client_id} = req.body

  try{
  const dogTxt = `
            INSERT INTO dogs 
              ("client_id", "name", "image", "vet_name", "vet_phone", "notes") 
              VALUES
              ($1, $2, $3, $4, $5, $6) ;
  `
  const dogValues = [client_id, dog_name, image, vet_name, vet_phone, dog_notes]
  pool.query(dogTxt, dogValues)
  res.sendStatus(201);
  } catch (error) {
    console.log('Error adding new dog to client', error)
    res.sendStatus(500);
  }
});


router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('arrived in server get one route', req.params.id)
    let clientId = req.params.id
    const queryText = `
    SELECT clients.first_name, clients.id, clients.last_name, clients.notes, clients.phone, clients.email, routes.id as route,
    routes.name as route_name, clients.street, clients.city, clients.zip, dogs.name as dog_name, dogs.id as dog_id, dogs.image, dogs.vet_name, dogs.vet_phone, 
   clients_schedule."1", clients_schedule."2", clients_schedule."3", clients_schedule."4", clients_schedule."5"  
    from clients
            JOIN dogs
            ON clients.id = dogs.client_id
            JOIN routes
            ON clients.route_id=routes.id
            JOIN clients_schedule
            ON clients.id = clients_schedule.client_id
            WHERE clients.id = $1;
 
  ;
    `
  const queryValues = [clientId]
  pool.query(queryText, queryValues)
      .then(result => {
        console.log('how to target schedule?', result.rows[0])
        console.log(result.rows[0][1])
      
          //all IDs from database
          let idArray = [];
              for(let object of result.rows){
                  // console.log(object.id)
                  idArray.push(object.id)
              }
        
        //this filters out duplicate IDs
        let uniqueIds = [...new Set(idArray)]
  
      //this groups result.rows by id
        const group = result.rows.reduce((acc, item) => {
          if (!acc[item.id]) {
            acc[item.id] = [];
          }
          
          acc[item.id].push(item);
          return acc;
        }, {})
          // console.log(result.rows);
          console.log(group)
          let clients = [];
  
          
          for (let i = 0; i<uniqueIds.length; i++){
              let forDogMap = group[uniqueIds[i]]
         
              // const {first_name, last_name, address} = result.rows[0];
              const {first_name, last_name, street, city, zip, id, phone, email, notes, vet_name, vet_phone, route, route_name } = forDogMap[0];
              const client = {first_name, last_name, street, city, zip, id, phone, email, notes, vet_name, vet_phone, route, route_name}
              client.dogs = forDogMap.map(dog => {return({dog_name: dog.dog_name, image: dog.image, dog_id: dog.dog_id})})
  
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

  router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.params.id)
    
    const queryText = 'DELETE FROM clients WHERE id=$1';
    pool.query(queryText, [req.params.id])
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing delete client query', err);
        res.sendStatus(500);
      });
  });

  router.delete('/dogs/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.params.id)
    
    const queryText = 'DELETE FROM dogs WHERE id=$1';
    pool.query(queryText, [req.params.id])
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing delete dog query', err);
        res.sendStatus(500);
      });
  });
  
  
  

module.exports = router;
