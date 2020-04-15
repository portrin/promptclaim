const Notifcation = require('../models/customer/notification-model');
const jwt = require('jsonwebtoken');

exports.getNotification = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const notifications = (await Notifcation._readByCustomerId(customerId))[0];
    console.log(notifications);
    res.send(notifications);
}; 

// not ready yet
exports.deleteNotification = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    //const notiId; //don't know how to get notiId yet
    const result = await Notifcation._delete(customerId, notiId);
    console.log('Notification deleted!');
    res.send(result);
};


