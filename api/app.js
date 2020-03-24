// require library
const express = require('express');
const errorHandler = require('errorhandler');
const morgan = require('morgan');
const testRoutes = require('./routes/test-route');
const auth = require('./routes/auth-route');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

// declare constant values
const PORT = process.env.ports || 8001;

const productRoutes = require('./routes/product-route');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

app.use(productRoutes);

// setup middleware
app.use(morgan('dev'));
app.use(errorHandler());
app.use('/test', testRoutes);


// start server
app.listen(PORT, () => {
    console.log(`server starts on port ${PORT}`);
})
