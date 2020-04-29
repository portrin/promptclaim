// require library
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
dotenv.config();

// declare constant values
const PORT = process.env.API_PORT || 8001;

// setup middleware
app.use(morgan('dev'));
app.use(errorhandler());
app.use(bodyParser.json());
app.use(cors());

// retailer routes
const retailerRoute = require('./routes/retailer/retailer-route');
app.use('/retailer', retailerRoute);

// customer routes
const customerRoute = require('./routes/customer/customer-route');
app.use('/customer', customerRoute);

// start server
app.listen(PORT, () => {
    console.log(`server starts on port ${PORT}`);
})


