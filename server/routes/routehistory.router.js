const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc);

const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// packleader route history
router.post('/', async (req, res) => {
  const { emp_id, route_id } = req.body;
    console.log(emp_id, route_id)
  const sqlQuery = `
  INSERT INTO route_history
      ("emp_id", "route_id")
  VALUES
      ($1, $2)
  ON CONFLICT (emp_id, date)
  DO UPDATE SET "route_id" = $2;
  `;

  pool.query(sqlQuery, [emp_id, route_id])
      .then(dbRes => {
          res.sendStatus(201);
      })
      .catch(err => {
          res.sendStatus(500);
          console.log('error in POST /employees/history: ', err);
      });
})


// can 
router.delete('/', async (req, res) => {
  const { emp_id } = req.body;
  const sqlQuery = `
  DELETE FROM route_history
      WHERE "date" = CURRENT_DATE AND "emp_id" = $1;
  `;

  pool.query(sqlQuery, [emp_id])
      .then(dbRes => {
          res.sendStatus(201);
      })
      .catch(err => {
          res.sendStatus(500);
          console.log('error in DELETE /employees/history: ', err);
      });
});

router.get('/:date', async (req, res) => {
  console.log('in /api/history/:date', req.params.date)
  const date = new Date(req.params.date);
  const sqlQuery = `
      SELECT
          first_name,
          last_name,
          phone,
          emp_id,
          route_id,
          routes.name AS route_name,
          route_history.date AS date
      FROM route_history
          JOIN employees ON route_history.emp_id = employees.id
          JOIN routes ON route_history.route_id = routes.id
      WHERE route_history.date = $1;
  `;
  pool.query(sqlQuery, [date])
      .then(dbRes => {
          res.send(dbRes.rows)
      })
      .catch(err => {
          res.sendStatus(500);
          console.log('error in GET /employees/history: ', err);
      });
});

module.exports = router;