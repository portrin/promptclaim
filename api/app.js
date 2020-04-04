// require library
const express = require('express');
const errorhandler = require('errorhandler');
const morgan = require('morgan');
const app = express();


// declare constant values
const PORT = process.env.ports || 8001;

// setup middleware
app.use(morgan('dev'));
app.use(errorhandler());



//Praew user-route
const userRoutes = require('./routes/user-route')
app.use('/user', userRoutes)

//Product Route
const productRoutes = require('./routes/product-route');
app.use('/product', productRoutes);

// start server
app.listen(PORT, () => {
    console.log(`server starts on port ${PORT}`);
})
