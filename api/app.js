// require library
const express = require('express');
const errorHandler = require('errorhandler');
const morgan = require('morgan');
const testRoutes = require('./routes/test-route');
<<<<<<< HEAD
const authRoutes = require('./routes/auth-route');
const bodyParser = require('body-parser');
const auth = require('./middleware/auth-middleware').requireJWTAuth;
=======
const auth = require('./routes/auth-route');
const bodyParser = require('body-parser');
const path = require('path');


>>>>>>> decf01649dcd5f527670a0b9a6cce08ce46dd523
const app = express();

// declare constant values
const PORT = process.env.ports || 8001;

const productRoutes = require('./routes/product-route');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

app.use(productRoutes);

// setup middleware
app.use(morgan('dev'));
<<<<<<< HEAD
app.use(errorhandler());
app.use(bodyParser.json());
app.use('/test', auth, testRoutes); // now test routes needs to auth
app.use('/auth', authRoutes);

=======
app.use(errorHandler());
app.use('/test', testRoutes);
>>>>>>> decf01649dcd5f527670a0b9a6cce08ce46dd523


// start server
app.listen(PORT, () => {
    console.log(`server starts on port ${PORT}`);
})
