const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


// const OAuthClient = require('intuit-oauth');

const app = express();


const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const imageRouter = require('./routes/image.router');
const employeesRouter = require('./routes/employees.router');
const clientsRouter = require('./routes/clients.router');
const mobileRouter = require('./routes/mobile.router');
const invoiceRouter = require('./routes/invoice.router');
const clientScheduleRouter = require('./routes/clientSchedule.router');
const adminRouter = require('./routes/admin.router');
const quickbooksRouter = require('./routes/quickbooks.router');
// const callbackRouter = require('./routes/callback.router');
const testRouter = require('./routes/test.router');




// Body parser middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);



/* OAuth Library */
// const oauthClient = new OAuthClient({
//   clientId: process.env.clientId,
//   clientSecret: process.env.clientSecret,
//   environment: 'sandbox' || 'production',
//   redirectUri: '<Enter your callback URL>',
// });

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.use('/api/employees', employeesRouter);

app.use('/api/clients', clientsRouter);
app.use('/api/mobile', mobileRouter);

app.use('/api/invoice', invoiceRouter);
app.use('/api/clientSchedule', clientScheduleRouter);

app.use('/api/admin', adminRouter);
app.use('/api/quickbooks', quickbooksRouter);

app.use('/api/callback', callbackRouter)





// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
