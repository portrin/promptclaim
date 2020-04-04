// require library
const express = require('express');
const errorhandler = require('errorhandler');
const morgan = require('morgan');
const testRoutes = require('./routes/test-route');
const app = express();


// declare constant values
const PORT = process.env.ports || 8001;

// setup middleware
app.use(morgan('dev'));
app.use(errorhandler());
app.use('/test', testRoutes);


//Praew user-route
const customerRoutes = require('./routes/customer-route')
app.use('/user', customerRoutes)


// start server
app.listen(PORT, () => {
    console.log(`server starts on port ${PORT}`);
})
