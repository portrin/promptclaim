// require library
const express = require('express');
const errorhandler = require('errorhandler');
const morgan = require('morgan');
const productRoutes = require('./routes/product-route');
const bodyParser = require('body-parser');

const app = express();

// declare db connection
const db = require('./config/db');

// declare constant values
const PORT = process.env.ports || 8001;



// setup middleware
app.use(morgan('dev'));
app.use(errorhandler());
app.use(bodyParser.json());



app.use('/product', productRoutes);


// start server
app.listen(PORT, () => {
    console.log(`server starts on port ${PORT}`);
})
