const Notifcation = require('../../models/customer/notification-model');
const jwt = require('jsonwebtoken');

exports.getNotification = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const notifications = (await Notifcation._readByCustomerId(customerId))[0];
    console.log(notifications);
    res.send(notifications);
}; 




