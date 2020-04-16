const express = require('express');
const controller = require('../../controllers/customer/notification-controller');
const router = express.Router();

router.get('/get', controller.getNotification);

router.delete('/delete', controller.deleteNotification);

module.exports = router;
