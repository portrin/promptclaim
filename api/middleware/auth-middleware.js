const jwt = require('jwt-simple');
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;

const SECRET = 'e kuay'; // In production, we need to hide this secret in environment 

// Setup JWT and Passport
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: SECRET // will change to environment variable in the future
};

const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
    if (payload.sub === "por") {
        done(null, true); // real code will query in SQL database to compare username
    } else { 
       done(null, false);
    }
});

passport.use(jwtAuth);

// Authentication Middleware
const login = (req, res, next) => {
    if(req.query.username === 'por' && req.query.password === 'password') { 
        next(); // this has to be an SQL query that search for username and password
    } else {
        res.send('invalid username or password');
    }
}

const requireJWTAuth = passport.authenticate("jwt",{session:false});

module.exports = {
    login,
    requireJWTAuth
}