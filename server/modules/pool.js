const pg = require('pg');
const config = require('../modules/config');

let configPool = {};

if (process.env.DATABASE_URL) {
  configPool = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    schema: config.SCHEMA
  };
} else {
  configPool = {
    host: 'localhost',
    port: 5432, // env var: PGPORT
    database: 'citizen_kanine',
    schema: config.SCHEMA
  };
}

// this creates the pool that will be shared by all other modules
const pool = new pg.Pool(configPool);

pool.on('connect',async (client)=> {
  client.query(`SET search_path TO ${configPool.schema}, public`);
  // for development testing!
  if (!process.env.NODE_ENV) {
    client.query(`SET TIMEZONE='UTC'`);
  }
});

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
