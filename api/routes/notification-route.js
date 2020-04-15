const express = require('express');
const notificationController = require('../controllers/notification-controller');
const router = express.Router();

router.get('/get', notificationController.getNotification);

router.delete('/delete/', notificationController.deleteNotification);

module.exports = router;
