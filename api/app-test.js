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

const authRoute = require('./routes/auth-route');
app.use('/auth', authRoute);

const customerRoute = require('./routes/customer-route');
app.use('', auth.requireJwtAuth, customerRoute);

const claimLogRoutes = require('./routes/claim-log-route');
app.use('/claimlog', auth.requireJwtAuth, claimLogRoutes);


// start server
app.listen(PORT, () => {
    console.log(`server starts on port ${PORT}`);
})
