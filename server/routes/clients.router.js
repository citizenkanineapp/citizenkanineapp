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
                    SELECT clients.first_name, clients.id, clients.last_name, clients.notes, clients.phone, clients.email, routes.name as route,
                    clients.street, clients.city, clients.zip, dogs.name as dog_name, dogs.image, dogs.vet_name, dogs.vet_phone from clients
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
            const {first_name, last_name, street, city, zip, id, phone, email, notes, vet_name, vet_phone, route} = forDogMap[0];
            const client = {first_name, last_name, street, city, zip, id, phone, email, notes, vet_name, vet_phone, route}
            client.dogs = forDogMap.map(dog => {return({dog_name: dog.dog_name, image: dog.image})})

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
  console.log(req.body);
  const client = await pool.connect();
  const {first_name, last_name, street, city, zip_code, email, route_id, phone, dogs, schedule, notes, vet_name, vet_phone } = req.body
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
  `, [first_name, last_name, street, city, zip_code, route_id, phone, email, notes])
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

module.exports = router;
