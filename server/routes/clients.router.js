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
                    clients.address, dogs.name as dog_name, dogs.vet_name, dogs.vet_phone from clients
                            JOIN dogs
                            ON clients.id = dogs.client_id
                            JOIN routes
                            ON clients.route_id=routes.id
                            ORDER BY clients.last_name ASC
;
  `;
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

        //taking a break here.  This currently gives me a client object but it isn't filtering out duplicate IDs
        // Need to get dogs into an dog object and attach it to the client ID
        
        for (let i = 0; i<uniqueIds.length; i++){
            let forDogMap = group[uniqueIds[i]]
       
            // const {first_name, last_name, address} = result.rows[0];
            const {first_name, last_name, address, id, phone, email, notes, vet_name, vet_phone, route} = forDogMap[0];
            const client = {first_name, last_name, address, id, phone, email, notes, vet_name, vet_phone, route}
            client.dogs = forDogMap.map(dog => {return({dog_name: dog.dog_name})})
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
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
