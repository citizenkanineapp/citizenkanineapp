// module imports

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const {
    rejectUnauthorized,
} = require('../modules/authorization-middleware');

// API endpoint https://this_app/api/invoice/
// get client data by clientId, month and year
router.get('/', rejectUnauthenticated, rejectUnauthorized, async (req, res) => {
    console.log('in /api/invoice');
    // connect to postgres database pool
    // this is confusing: this 'client' object refers to postgres database connection;
    // otherwise, 'client' refers to citizen kanine clients.
    const client = await pool.connect();
    // console.log(req.query)
    
    // extract search parameters from request
    const searchClientId = req.query.clientId;
    //console.log('client id?', searchClientId)
    const searchMonth = req.query.month;
    const monthString = searchMonth.padStart(2,'0');

    const searchYear = req.query.year;
    let searchTerms;

    const querySchedule = `SELECT * FROM clients_schedule`;
    const queryServices = `SELECT * FROM services`;

    // set searchQuery
    if (searchClientId != 0) {
        // use in case of client ALL
        searchQuery = `
            WHERE
                clients.id = $1 AND
                EXTRACT (MONTH FROM daily_dogs.date) = $2 AND
                EXTRACT (YEAR FROM daily_dogs.date) = $3 AND
            `;
        searchTerms = [searchClientId, searchMonth, searchYear];
        // console.log(searchQuery);
    } else {
        searchQuery = `
            WHERE
                EXTRACT (MONTH FROM daily_dogs.date) = $1 AND
                EXTRACT (YEAR FROM daily_dogs.date) = $2 AND
            `;
        searchTerms = [searchMonth, searchYear];
        // console.log(searchQuery);
    }

    // console.log(searchQuery);

    // expanded SQL query
    // query returns data object of each walk instance by customer-date query parameters
    const queryWalkDetails = `
    SELECT
        clientid,
        qb_id,
        first_name,
        last_name,
        email,
        street,
        city,
        zip,
        lat,
        long,
        num_dogs,
        ARRAY_AGG (
            EXTRACT (DAY FROM date)
            ORDER by date ASC
        ) dates,
        checked_in,
        no_show
    FROM (	
        SELECT
            clients.id AS clientid,
            clients.qb_id,
            clients.email AS email,
            clients.street,
            clients.city,
            clients.zip,
            clients.lat,
            clients.long,
            daily_dogs.date,
            COUNT(dogs.id) AS num_dogs,
            daily_dogs.checked_in AS checked_in,
            daily_dogs.no_show AS no_show,
            clients.last_name AS last_name,
            clients.first_name AS first_name
        FROM daily_dogs
            JOIN "dogs"
                ON daily_dogs.dog_id = dogs.id
            JOIN clients
                ON dogs.client_id = clients.id`
        + searchQuery +
        `
            (checked_in = true OR no_show = true)
            GROUP BY
                daily_dogs.date,
                checked_in,
                no_show,
                email,
                last_name,
                first_name,
                clientid,
                street,
                city,
                zip,
                lat,
                long
            ORDER BY
                clientid,
                date
        ) results
    GROUP BY
        clientid,
        qb_id,
        first_name,
        last_name, 
        email,
        num_dogs,
        checked_in,
        no_show,
                street,
                city,
                zip,
                lat,
                long;
    `;

    try {
        // get list of SERVICES (walk frequencies and their rates) from database
        const resServices = await client.query(queryServices)
        const services = resServices.rows;
         //console.log(services);

         // get all client service history from 'daily_dogs' table by customer-date query parameters
        const resDetails = await client.query(queryWalkDetails, searchTerms);
        const invoiceData = resDetails.rows;
         //console.log('invoiceData', invoiceData);

        // get clients' schedules
        const resSchedule = await client.query(querySchedule);
        const schedules = resSchedule.rows;
         //console.log('schedules', schedules)

        //adds service data to invoice data object.
        for (let item of invoiceData) {
            let serviceId
            //console.log(item);

            // this for loop evaluates the services *actually* provided to each client
            for (let client of schedules) {
                // console.log('client.id: ', client.client_id, "item.clientid: ", item.clientid);
                if (client.client_id === item.clientid) {
                    const values = Object.values(client);
                    // walks is the number of times clients' dogs have been walked per week.
                    const walks = values.filter(i => i === true).length;

                /*
                    grabs services ID from services list. 
                    These are primary key id value of each service in service table
                    (see: database.sql).
                    If table changes, these will need to be fixed.

                    id   Group Dog Walking:{service}
                    1:   Walk 1 dog - Ad hoc
                    2:   Walk 1 dog 2-4x / week
                    3:   Walk 1 dog 5 days / week
                    4:   Walk 2 dogs - Ad hoc
                    5:   Walk 2 dogs - 2-4x / week
                    6:   Walk 2 dogs 5 days / week
                    7:   Walk 3 dogs
                    8: 
                */
                
                    // if one dog is walked "walks" times per week:
                    if (Number(item.num_dogs) === 1) {
                        switch (walks) {
                            case 1: case 0:
                                serviceId = 1;
                                break;
                            case 2: case 3: case 4:
                                serviceId = 2;
                                break;
                            case 5:
                                serviceId = 3;
                                break;
                        }
                    // if two dogs are walked "walks" times per week
                    } else if (Number(item.num_dogs) === 2) {
                        switch (walks) {
                            case 1: case 0:
                                serviceId = 4;
                                break;
                            case 2: case 3: case 4:
                                serviceId = 5;
                                break;
                            case 5:
                                serviceId = 6;
                                break;
                        }
                    // if three dogs are walked. service for three dogs is fixed, regardless of weekly walk frequency
                    } else if (Number(item.num_dogs) >= 3 ) {
                        serviceId = 7;
                    // null; why not?
                    } else {
                        serviceId = 8;
                    }
                }

            }
            
            // adds service details to invoice item
            for (let service of services) {
                if (service.id === serviceId) {
                    item.month = monthString;
                    item.year = searchYear;
                    item.service = {
                        price: service.price,
                        qb_id: service.qb_id,
                        service
                    }
                    if (item.no_show === true) {
                        item.service.service = 'Same Day Cancellation';
                    } else {
                        item.service.service = service.name;
                    }
                }
            }
        }
        //console.log(invoiceData);

        if (invoiceData[0]) {
            //sends invoice data if there are any invoices
            //console.log(invoiceData)
            res.send(invoiceData);
        } else {
            res.sendStatus(204)
        }
    } catch (error) {
        console.log('Error GET /api/invoice', error);
        res.sendStatus(500);
    } finally {
        console.log ('release invoice pool')
        client.release();
    }
});

module.exports = router;