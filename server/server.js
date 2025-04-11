const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const config = require('./modules/config');

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
const oauth2Router = require('./routes/quickbooks.oauth2.router');
const qbInvoiceRouter = require ('./routes/quickbooks.invoice.router');
const passReset = require('./routes/passreset.router');
const qbServicesRouter = require('./routes/quickbooks.services.router');
const routeHistory = require('./routes/routehistory.router');

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

//test middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


/* Routes */
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/mobile', mobileRouter);
app.use('/api/invoice', invoiceRouter);
app.use('/api/clientSchedule', clientScheduleRouter);
app.use('/api/pass_reset', passReset);
app.use('/api/admin', adminRouter);
app.use('/api/quickbooks', quickbooksRouter);
app.use('/api/oauth2', oauth2Router);
app.use('/api/qbInvoice', qbInvoiceRouter);
app.use('/api/qb_services', qbServicesRouter);
app.use('/api/history', routeHistory);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5001;
console.log("PORT:", PORT)
//TZ SET FOR DEVELOPMENT PURPOSES
if (!process.env.PORT) {process.env.TZ = 'Etc/GMT'};

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}, connecting to db schema ${config.SCHEMA}`);
  // logs for confirming timezone issues in development
  if (!process.env.PORT) {
    console.log('timzone is: ', process.env.TZ)
    console.log(`Current Sever Time: ${new Date().toString()}`);
    console.log(`Current client time: ${new Date().toLocaleString('en-US', { timeZone: 'Etc/GMT+5' })}`);
  }
});