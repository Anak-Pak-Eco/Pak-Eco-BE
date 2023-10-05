const express = require('express');
const firebaseApp = require('../configs/firebase');

const router = new express.Router();

router.post('/send', (req, res) => {
  const {
    title,
    body,
    device_id: deviceId,
    registration_token: registrationToken,
  } = req.body;

  if (deviceId) {
    firebaseApp.messaging().send({
      notification: {
        title: title,
        body: body,
      },
      topic: deviceId,
    }).then((response) => {
      res.status(200).json({
        message: 'Successfully send notification',
        status_code: 200,
        data: {
          reference: response,
        },
      });
    }).catch((error) => {
      res.status(400).json({
        message: 'Failed to send notification',
        status_code: 400,
        data: error,
      });
    });
  } else if (registrationToken) {
    firebaseApp.messaging().send({
      notification: {
        title: title,
        body: body,
      },
      token: registrationToken,
    }).then((response) => {
      res.status(200).json({
        message: 'Successfully send notification',
        status_code: 200,
        data: {
          reference: response,
        },
      });
    }).catch((error) => {
      res.status(400).json({
        message: 'Failed to send notification',
        status_code: 400,
        data: error,
      });
    });
  } else {
    res.status(400).json({
      // eslint-disable-next-line max-len
      message: 'Failed to send notification, required device_id, or registration_token',
      status_code: 400,
      data: null,
    });
  }
});

module.exports = router;
