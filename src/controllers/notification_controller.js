const firebaseApp = require('../configs/firebase');

module.exports = {
  sendNotification: async (req, res) => {
    const {
      title,
      body,
      device_id: deviceId,
      registration_token: registrationToken,
    } = req.body;

    try {
      const notification = {
        title: title,
        body: body,
        device_id: deviceId ? deviceId : '',
        registation_token: registrationToken ? registrationToken : '',
        action: deviceId ? 'alert' : 'push-notification',
        created_date: new Date(),
      };

      const newNotification = await firebaseApp.firestore()
          .collection('notifications')
          .add(notification);

      console.log('New Notification ' + newNotification);

      let response = {};

      if (deviceId) {
        response = await firebaseApp.messaging().send({
          notification: {
            title: title,
            body: body,
          },
          data: {
            custom_data: 'Test',
          },
          topic: deviceId,
        });
      } else {
        response = await firebaseApp.messaging().send({
          notification: {
            title: title,
            body: body,
          },
          data: {
            custom_data: 'Test',
          },
          token: registrationToken,
        });
      }

      return res.status(200).json({
        message: 'Successfully send notification',
        status_code: 200,
        data: {
          reference: response,
          newNotification,
        },
      });
    } catch (e) {
      return res.status(400).json({
        message: 'Failed to send notification',
        status_code: 400,
        data: e.message,
      });
    }
  },
};
