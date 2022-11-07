const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log('arrived in server get all route')
  const queryText = `
            SELECT clients.first_name, clients.id, clients.last_name, clients.address, dogs.name as dog_name from clients
                    JOIN dogs
                    ON clients.id = dogs.client_id
                    ORDER BY clients.last_name ASC
;
  `
pool.query(queryText)
    .then(result => {

    //this groups result.rows by id
      const group = result.rows.reduce((acc, item) => {
        if (!acc[item.id]) {
          acc[item.id] = [];
        }
        
        acc[item.id].push(item);
        return acc;
      }, {})
        console.log(result.rows);
        let clients = [];

        //taking a break here.  This currently gives me a client object but it isn't filtering out duplicate IDs
        // Need to get dogs into an dog object and attach it to the client ID
        
        for (let i = 0; i<result.rows.length; i++){
            const {first_name, last_name, address} = result.rows[0];
            const client = {first_name, last_name, address}
            clients.push(client)

        }
        console.log('attempting to make clients', clients)
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
