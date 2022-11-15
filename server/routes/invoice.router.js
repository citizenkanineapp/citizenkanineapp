const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const dayjs =require('dayjs');
// This plugin is needed to get the week number in year:
const weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)

router.get('/', async (req, res) => {
    console.log('in /api/invoice');
    // console.log(req.query)
    const searchClientId = req.query.clientId;
    const searchMonth = req.query.month;
    const searchYear = req.query.year;
    let searchTerms ;

    const querySchedule = `SELECT * FROM clients_schedule`;
    const queryServices = `SELECT * FROM services`;

    // use in case of client ALL
    if (searchClientId) {
        searchQuery = `
            WHERE
                clients.id = $1 AND
                EXTRACT (MONTH FROM daily_dogs.date) = $2 AND
                EXTRACT (YEAR FROM daily_dogs.date) = $3
            `;
        searchTerms = [ searchClientId, searchMonth, searchYear ];
    } else {
        searchQuery = `
            WHERE
                EXTRACT (MONTH FROM daily_dogs.date) = $1 AND
                EXTRACT (YEAR FROM daily_dogs.date) = $2
            `;
        searchTerms = [ searchMonth, searchYear ];
    }

    // console.log(searchQuery);

    // query returns data object of each walk instance by customer-date
    const queryWalkDetails = `
    SELECT
        clientid,
        first_name,
        last_name,
        num_dogs,
        ARRAY_AGG (
            EXTRACT (MONTH FROM date)||'/' || EXTRACT (DAY FROM date)
            ORDER by date ASC
        ) dates,
        checked_in,
        no_show
    FROM (	
        SELECT
            clients.id AS clientid,
            daily_dogs.date,
            daily_dogs.week_of_year,
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
            GROUP BY
                daily_dogs.date,
                checked_in,
                no_show,
                last_name,
                first_name,
                clientid,
                daily_dogs.week_of_year
            ORDER BY
                clientid,
                date
        ) results
    GROUP BY
        clientid,
        first_name,
        last_name, 
        num_dogs,
        checked_in,
        no_show;
    `;


    try {
        const resServices = await pool.query(queryServices)
        const services = resServices.rows;
        console.log(services);
        const resDetails = await pool.query(queryWalkDetails,searchTerms);
        const invoiceData = resDetails.rows;
        // console.log(invoiceData);

        const resSchedule = await pool.query(querySchedule);
        const schedules = resSchedule.rows;
        
        // adds walks per week to invoice data object. should be done in SQL!
        for ( let item of invoiceData ) {
            for ( let client of schedules) {
                if (client.id === item.clientid) {
                    const values = Object.values(client);
                    const walks = values.filter( i => i === true).length;
                    item.walks_per_week = walks;
                }
            }
            // grabs services values...
            let serviceId
            if (item.num_dogs === "1") {
                switch(item.walks_per_week) {
                    case 1:
                        serviceId = 2;
                        break;
                    case 2: case 3: case 4:
                        serviceId = 3;
                        break;
                    case 5:
                        serviceId = 4;
                        break;
                }
            } else if (item.num_dogs === "2") {
                switch(item.walks_per_week) {
                    case 1:
                        serviceId = 5;
                        break;
                    case 2: case 3: case 4:
                        serviceId = 6;
                        break;
                    case 5:
                        serviceId = 7;
                        break;
                }
            }  else if (item.num_dogs === "3") {
                serviceId = 8;
            }   else {
                serviceId = 9;
            }

            console.log('service Id', serviceId);
            console.log('item', item);


            for ( let service of services) {
                if (service.id === serviceId) {
                    if (item.no_show === true) {
                        item.service = {
                            service: service.name + ' ' + 'no-show',
                            price: service.price
                        }
                    } else {
                        item.service = {
                            service: service.name,
                            price: service.price
                        }
                    }
                }
            }  

        }
        
        // console.log(walksPerWeek);
        console.log(invoiceData);



        res.send(invoiceData); 
    } catch (error) {
        console.log('Error GET /api/invoice', error);
        res.sendStatus(500);
    }
});

module.exports = router;