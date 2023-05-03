//NODE_ENV automatically sets to "production" via 'npm build' on heroku.
//for staging app, an .env variable NODE_ENV is set to "staging", overriding heroku setting.
const nodeEnv = process.env.NODE_ENV || 'development';
const configEnv = {
  "development": "../../config.dev.json",
  "staging": "../../config.stage.json",
  "production": "../../config.json"
}
const config = require(configEnv[nodeEnv]);
console.log('node_env: ', nodeEnv); 

module.exports = config;