const firebaseApp = require('../configs/firebase');

const devicesRef = 'devices';

module.exports = {
  getDevices: async (req, res) => {
    try {
      const devicesResponse = await firebaseApp.database()
          .ref(devicesRef)
          .get();

      const devices = [];
      devicesResponse.forEach((value) => {
        devices.push({
          serial_number: value.key,
          name: value.child('name'),
          users_id: value.child('users_id'),
          plants_id: value.child('plants_id'),
          current_ph: value.child('current_ph'),
          current_ppm: value.child('current_ppm'),
          current_steps: value.child('current_steps'),
        });
      });

      return res.status(200).json({
        message: 'Success get device',
        status: true,
        data: devices,
      });
    } catch (e) {
      return res.status(400).json({
        message: 'Failed to get device',
        status: false,
        data: null,
      });
    }
  },
  getDeviceById: async (req, res) => {
    try {
      const {id} = req.params;

      const devicesResponse = await firebaseApp.database()
          .ref(devicesRef)
          .child(id)
          .get();

      if (devicesResponse.exists()) {
        return res.status(200).json({
          message: 'Success get device',
          status: true,
          data: {
            serial_number: devicesResponse.key,
            name: devicesResponse.child('name'),
            users_id: devicesResponse.child('users_id'),
            plants_id: devicesResponse.child('plants_id'),
            current_ph: devicesResponse.child('current_ph'),
            current_ppm: devicesResponse.child('current_ppm'),
            current_steps: devicesResponse.child('current_steps'),
          },
        });
      } else {
        return res.status(404).json({
          message: 'Device not found',
          status: false,
          data: null,
        });
      }
    } catch (e) {
      return res.status(400).json({
        message: 'Failed to get device',
        status: false,
        data: e.message,
      });
    }
  },
  updateDevice: async (req, res) => {
    const {
      name,
      serial_number: serialNumber,
      users_id: usersId,
      plants_id: plantsId,
      current_ph: currentPh,
      current_ppm: currentPpm,
      current_steps: currentSteps,
    } = req.body;

    try {
      const newDevice = await firebaseApp.database()
          .ref(devicesRef)
          .child(serialNumber)
          .set({
            name,
            users_id: usersId,
            plants_id: plantsId,
            current_ph: currentPh,
            current_ppm: currentPpm,
            current_steps: currentSteps,
            created_at: new Date(),
          });

      return res.status(200).json({
        message: 'Success add device',
        status: true,
        data: newDevice,
      });
    } catch (e) {
      return res.status(400).json({
        message: 'Failed to add device',
        status: false,
        data: e.message,
      });
    }
  },
  deleteDevice: async (req, res) => {
    const {id} = req.params;

    const devicesResponse = await firebaseApp.database()
        .ref(devicesRef)
        .child(id)
        .get();

    if (!devicesResponse.exists()) {
      return res.status(400).json({
        message: 'Failed to delete device',
        status: false,
        data: null,
      });
    }

    try {
      await firebaseApp.database().ref(devicesRef).child(id).remove();
      return res.status(200).json({
        message: 'Success to delete device',
        status: false,
        data: null,
      });
    } catch (e) {
      return res.status(400).json({
        message: 'Failed to delete device',
        status: false,
        data: e.message,
      });
    }
  },
};