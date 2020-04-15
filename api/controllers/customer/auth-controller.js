const jwt = require('jwt-simple');
const dotenv = require('dotenv');
const db = require('../config/db');
dotenv.config()

const SECRET = process.env.SECRET; // In production, we need to hide this secret in environment 

const login = async (req, res, next) => {
    const customer = (await db.execute('SELECT customer_id FROM customer_account NATURAL JOIN customer WHERE email = ?', [req.body.email]))[0]
    const payload = {
        sub: customer[0].customer_id,
        iat: new Date().getTime()
    }
    res.send(jwt.encode(payload, SECRET));
};

module.exports = {
    login
}