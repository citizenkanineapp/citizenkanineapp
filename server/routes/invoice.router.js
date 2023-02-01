const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const {
    rejectUnauthorized,
} = require('../modules/authorization-middleware');

router.get('/', rejectUnauthenticated, rejectUnauthorized, async (req, res) => {
    // console.log('in /api/invoice');
    // console.log(req.query)
    const searchClientId = req.query.clientId;
    console.log('client id?', searchClientId)
    const searchMonth = req.query.month;
    const searchYear = req.query.year;
    let searchTerms;

    const querySchedule = `SELECT * FROM clients_schedule`;
    const queryServices = `SELECT * FROM services`;

    // use in case of client ALL
    if (searchClientId != 0) {
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

    // query returns data object of each walk instance by customer-date
    const queryWalkDetails = `
    SELECT
        clientid,
        qb_id,
        first_name,
        last_name,
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
                last_name,
                first_name,
                clientid
            ORDER BY
                clientid,
                date
        ) results
    GROUP BY
        clientid,
        qb_id,
        first_name,
        last_name, 
        num_dogs,
        checked_in,
        no_show;
    `;

    try {
        const resServices = await pool.query(queryServices)
        const services = resServices.rows;
        // console.log(services);
        const resDetails = await pool.query(queryWalkDetails, searchTerms);
        const invoiceData = resDetails.rows;
        // console.log('invoiceData', invoiceData);

        const resSchedule = await pool.query(querySchedule);
        const schedules = resSchedule.rows;
        // console.log('schedules', schedules)


        // const testDailyDogs = await pool.query(`
        //     SELECT * FROM daily_dogs
        //     WHERE
        //     EXTRACT (MONTH FROM daily_dogs.date) = 1 AND
        //     EXTRACT (YEAR FROM daily_dogs.date) = 2023 AND
        //     (checked_in = true OR no_show = true);
        // `);

        // console.log(testDailyDogs.rows);







        //adds service data to invoice data object. some of this should be done in SQL!
        for (let item of invoiceData) {
            let serviceId
            // console.log(item);

            // adds walks per week to invoice item
            for (let client of schedules) {
                // console.log('client.id: ', client.client_id, "item.clientid: ", item.clientid);
                if (client.client_id === item.clientid) {
                    const values = Object.values(client);
                    const walks = values.filter(i => i === true).length;

                    // grabs services ID from services list. 
                    // These are equivalent to primary key id value of service in service table.
                    // If table changes, these will need to be fixed.
                    // id   Group Dog Walking:{service}
                    // 1:   Walk 1 dog - Ad hoc
                    // 2:   Walk 1 dog 2-4x / week
                    // 3:   Walk 1 dog 5 days / week
                    // 4:   Walk 2 dogs - Ad hoc
                    // 5:   Walk 2 dogs - 2-4x / week
                    // 6:   Walk 2 dogs 5 days / week
                    // 7:   3 dogs

                    // 8: 
                
                    if (item.num_dogs === "1") {
                        switch (walks) {
                            case 1:
                                serviceId = 1;
                                break;
                            case 2: case 3: case 4:
                                serviceId = 2;
                                break;
                            case 5:
                                serviceId = 3;
                                break;
                        }
                    } else if (item.num_dogs === "2") {
                        switch (walks) {
                            case 1:
                                serviceId = 4;
                                break;
                            case 2: case 3: case 4:
                                serviceId = 5;
                                break;
                            case 5:
                                serviceId = 6;
                                break;
                        }
                    } else if (item.num_dogs === "3") {
                        serviceId = 7;
                    } else {
                        serviceId = 8;
                    }
                }

            }
            // console.log('in walks/week', item.clientid, serviceId);
            

            // adds service details to invoice item
            for (let service of services) {
                if (service.id === serviceId) {
                    item.month = searchMonth;
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
        // console.log(invoiceData);

        if (invoiceData[0]) {
            // console.log(invoiceData)
            res.send(invoiceData);
        } else {
            res.sendStatus(204) //Sam added this
        }
    } catch (error) {
        console.log('Error GET /api/invoice', error);
        res.sendStatus(500);
    }
});

module.exports = router;