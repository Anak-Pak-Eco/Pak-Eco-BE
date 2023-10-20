const express = require('express');
const {sendNotification} = require('../controllers/notification_controller');

const router = new express.Router();

router.post('/send', sendNotification);

module.exports = router;
