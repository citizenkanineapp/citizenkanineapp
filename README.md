# Getting started: Local development environment

### Prerequisites

* node.js v16.x
* postgreSQL v14.11

### Node versioning

Node versioning may be an issue. One solution is to adopt node version manager ([nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)). Follow the link for detailed installation instructions.

NVM works well with bash or zsh. It may not be the best solution in Windows. One problem with NVM is that it can cause noticeable delays while loading bash. This is due to the nvm loading script the nvm installation writes the following to your .bashrc or .zshrc file:

```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```
The following solution is described [here](https://dev.to/thraizz/fix-slow-zsh-startup-due-to-nvm-408k).
Using oh-my-Zsh, you can address this issue by opening ~/.zshrc.
Delete or comment out the above script.
Add the following script to ~/.zshrc
```
zstyle ':omz:plugins:nvm' lazy yes
# Alt:
# zstyle ':omz:plugins:nvm' autoload yes

plugins=(
  nvm
)
```
### PostgreSQL versioning
I am currently running psql@17 with no errors.

### Using nvm
Uninstall node and reinstall via nvm
```
nvm install node
```
this should install latest node.
```
nvm install node 16
```
This installs node 16.x
```
nvm use 16
```
Do this in terminal before running application.

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

To seed local development database with dummy data, un-comment out relevant code in database.dev.sql.
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