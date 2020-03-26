// require library
const express = require('express');
const errorhandler = require('errorhandler');
const morgan = require('morgan');
const testRoutes = require('./routes/test-route');
const authRoutes = require('./routes/auth-route');
const productRoutes = require('./routes/product-route');
const bodyParser = require('body-parser');
const auth = require('./middleware/auth-middleware').requireJWTAuth;
const app = express();

// declare db connection
const db = require('./config/db');

// declare constant values
const PORT = process.env.ports || 8001;



// setup middleware
app.use(morgan('dev'));
app.use(errorhandler());
app.use(bodyParser.json());
app.use('/test', auth, testRoutes); // now test routes needs to auth
app.use('/product', productRoutes);
app.use('/auth', authRoutes);

// start server
app.listen(PORT, () => {
    console.log(`server starts on port ${PORT}`);
})
