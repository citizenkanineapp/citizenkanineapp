# Getting started: Local development environment

### Prerequisites

* node.js v16.x
* postgreSQL v14.11

### Deploy locally

```
$ git clone git@github.com:citizenkanineapp/citizenkanineapp.git
$ npm install
```
Create new database named "citizen_kanine" using postgreSQL CLI
```
$ createdb citizen_kanine

// or, open psql

$ psql
user=# CREATE DATABASE citizen_kanine
```

Populate database.

If you desire to seed local development database with dummy data, un-comment out relevant lines in database.dev.sql.
```
psql citizen_kanine < database.dev.sql
```

create dotenv file. (Keys for development env can be found in Heroku)

```
SERVER_SESSION_SECRET=XXXXXXX

# quickbooks keys
clientId= XXXXXXX
clientSecret=XXXXXXX

# API Key for Cloudinary
CLOUDINARY_NAME=XXXXXXX
CLOUDINARY_API_KEY=XXXXXXX
CLOUDINARY_API_SECRET=XXXXXXX

# API key for maps
map_api_key=XXXXXXX

# email reset keys
# email citizenkanineapp@gmail.com is the developer email account.
RESETEMAIL = citizenkanineapp@gmail.com
EMAILKEY = XXXXXXXXX

```

Start the server.
```
$ npm run server
```
Open another terminal window and start your client.
```
$ npm run client
```
Navigate to http://localhost:3000 if the run client script doesn't automatically open the application.