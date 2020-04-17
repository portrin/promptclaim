// retailer authentication controller
const jwt = require('jwt-simple');
const dotenv = require('dotenv');
const db = require('../../config/db');
dotenv.config()

const SECRET = process.env.SECRET; // In production, we need to hide this secret in environment 

const login = async (req, res, next) => {
    const retailer = (await db.execute('SELECT retailer_id FROM retailer NATURAL JOIN root_account WHERE username = ?', [req.body.username]))[0];
    const payload = {
        sub: retailer[0].retailer_id,
        iat: new Date().getTime()
    }
    res.send(jwt.encode(payload, SECRET));
};

module.exports = {
    login
}