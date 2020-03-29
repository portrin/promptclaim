const jwt = require('jwt-simple');

const SECRET = 'e kuay'; // In production, we need to hide this secret in environment 

const login = (req, res, next) => {
    const payload = {
        sub: req.query.username,
        iat: new Date().getTime()
    }
    res.send(jwt.encode(payload, SECRET));
};

module.exports = {
    login
}