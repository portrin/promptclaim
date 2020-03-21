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
app.get('/', (req, res, next) => {res.send('hello world')});
// start server
app.listen(PORT, () => {
    console.log(`server starts on port ${PORT}`);
})
