const Notifcation = require('../models/customer/notification-model');
const jwt = require('jsonwebtoken');

exports.getNotification = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const notifications = await Notifcation._readByCustomerId(customerId);
    console.log(notifications[0]);
    res.send(notifications[0]);
    console.log('Notification fetched!');
}; 

exports.deleteNotification = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    //const notiId; //don't know how to get notiId yet
    await Notifcation._delete(customerId, notiId)
    res.send('Notification deleted!');
};


