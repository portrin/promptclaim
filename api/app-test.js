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

const profileRoutes = require('./routes/customer/profile-route')
app.use('/customer/profile', profileRoutes);

// start server
app.listen(PORT, () => {
    console.log(`server starts on port ${PORT}`);
})