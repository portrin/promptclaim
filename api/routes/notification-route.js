const express = require('express');
const notificationController = require('../controllers/notification-controller');
const router = express.Router();

router.get('notification/get', notificationController.getNotification);

module.exports = router;
