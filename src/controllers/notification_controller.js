const firebaseApp = require('../configs/firebase');

const notificationRef = 'notifications';

module.exports = {
  getNotifications: async (req, res) => {
    try {
      const notifications = [];

      const notificationDocs = await firebaseApp.firestore()
          .collection(notificationRef)
          .get();

      notificationDocs.forEach((notification) => {
        notifications.push(notification.data());
      });

      return res.status(200).json({
        message: 'Success to get notification',
        status_code: 200,
        data: notifications,
      });
    } catch (e) {
      return res.status(400).json({
        message: 'Failed to get notification',
        status_code: 400,
        data: e.message,
      });
    }
  },
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
        device_id: deviceId ? deviceId : null,
        registation_token: registrationToken ? registrationToken : null,
        action: deviceId ? 'alert' : 'push-notification',
        created_date: new Date(),
      };

      const newNotification = await firebaseApp.firestore()
          .collection(notificationRef)
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
