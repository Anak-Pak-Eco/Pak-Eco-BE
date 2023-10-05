const express = require('express');
const firebaseApp = require('../configs/firebase');

const router = new express.Router();

router.post('/hello', (req, res) => {
  const {message} = req.body;

  firebaseApp.messaging().send({
    notification: {
      title: 'Test Notification',
      body: message,
    },
    topic: 'device_alert',
  }).then((response) => {
    res.status(200).json({
      message: 'Successfully send notification',
      data: response,
    });
  }).catch((error) => {
    res.status(400).json({
      message: 'Failed to send notification',
      data: error,
    });
  });
});

module.exports = router;
