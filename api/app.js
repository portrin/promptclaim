// require library
const express = require('express');
const dotenv = require('dotenv');
const errorhandler = require('errorhandler');
const morgan = require('morgan');
const app = express();
dotenv.config();

// declare constant values
const PORT = process.env.API_PORT || 8001;

// setup middleware
app.use(morgan('dev'));
app.use(errorhandler());

//Praew user-route
const customerRoutes = require('./routes/customer-route')
app.use('/user', customerRoutes)


const productRoutes = require('./routes/product-route');
app.use('/product', productRoutes);





// start server
app.listen(PORT, () => {
    console.log(`server starts on port ${PORT}`);
})


