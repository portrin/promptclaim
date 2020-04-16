// require library
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const morgan = require('morgan');
const auth = require('./middleware/auth-middleware');
const app = express();
dotenv.config();

// declare constant values
const PORT = process.env.API_PORT || 8001;

// setup middleware
app.use(morgan('dev'));
app.use(errorhandler());
app.use(bodyParser.json());

const authRoute = require('./routes/customer/auth-route');
app.use('/auth', authRoute);

// const customerRoute = require('./routes/customer-route');
// app.use('', auth.requireJwtAuth, customerRoute);

// const customerRoutes = require('./routes/customer-route')
// app.use('/customer', auth.requireJwtAuth,customerRoutes)

// const notificationRoute = require('./routes/notification-route');
// app.use('/notification', auth.requireJwtAuth, notificationRoute);

const policyRoute = require('./routes/customer/policy-route');
app.use('/', auth.requireJwtAuth, policyRoute);

// start server
app.listen(PORT, () => {
    console.log(`server starts on port ${PORT}`);
})