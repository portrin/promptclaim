// require library
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const morgan = require('morgan');
const app = express();
dotenv.config();

// declare constant values
const PORT = process.env.API_PORT || 8001;

// setup middleware
app.use(morgan('dev'));
app.use(errorhandler());
app.use(bodyParser.json());

// customer add account route
const customerAddAccountRoute = require('./routes/customer/customer-account-route');
app.use('/customer/account', customerAddAccountRoute)

// customer routes
const customerRoute = require('./routes/customer/customer-route');
app.use('/customer', customerRoute);

// customer add account route
const addRetailerRoute = require('./routes/retailer/retailer-profile-route');
app.use('/retailer/profile', addRetailerRoute)

// retailer routes
const retailerRoute = require('./routes/retailer/retailer-route');
app.use('/retailer', retailerRoute);

// start server
app.listen(PORT, () => {
    console.log(`server starts on port ${PORT}`);
})


