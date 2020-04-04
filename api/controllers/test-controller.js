const user = require('../models/Customer/user-model');

const hello = (req, res, next) => {
    res.send('hello from test page');
}

const getUser = (req, res, next) => { // test route for fetch user data
    res.send(user.getUser());
}

module.exports = {
    hello,
    getUser
};

