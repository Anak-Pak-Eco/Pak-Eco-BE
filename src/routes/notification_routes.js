const express = require('express');
const {
  sendNotification,
  getNotifications,
} = require('../controllers/notification_controller');

const router = new express.Router();

router.post('/send', sendNotification);
router.get('/', getNotifications);

module.exports = router;
