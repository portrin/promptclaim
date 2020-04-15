const jwt = require('jwt-simple');
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const dotenv = require('dotenv');
const db = require('../config/db');
dotenv.config()

// Setup JWT and Passport
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: process.env.SECRET // will change to environment variable in the future
};

const jwtAuth = new JwtStrategy(jwtOptions, async (payload, done) => {
    const result = (await db.execute('SELECT customer_id FROM customer WHERE customer_id = ?', [payload.sub]))[0]
    console.log(result);
    if (result) {
        done(null, true); // real code will query in SQL database to compare customerId
    } else { 
       done(null, false);
    }
});

passport.use(jwtAuth);

// Authentication Middleware
const login = async (req, res, next) => {
    const result = (await db.execute('SELECT email, password FROM customer_account WHERE email = ?', [req.body.email]))[0]
    if(result.length === 0) { 
        res.send('invalid username or password');
    } else if (req.body.email === result[0].email && req.body.password === result[0].password) {
        next();
    }
}

const requireJwtAuth = passport.authenticate("jwt",{session:false});

module.exports = {
    login,
    requireJwtAuth
}