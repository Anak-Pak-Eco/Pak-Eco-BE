const express = require('express');
const {
  getDevices,
  getDeviceById,
  updateDevice,
  deleteDevice,
} = require('../controllers/devices_controller');
const firebaseApp = require('../configs/firebase');

const router = new express.Router();

router.get('/get-devices', getDevices);
router.get('/get-device/:id', getDeviceById);
router.post('/update', updateDevice);
router.delete('/delete/:id', deleteDevice);
router.post('/add-history', async (req, res) => {
  try {
    const {
      serial_number: serialNumber,
      current_ph: currentPh,
      current_ppm: currentPpm,
    } = req.body;

    const history = await firebaseApp.database()
        .ref('devices')
        .child(serialNumber)
        .get();

    if (history.exists()) {
      const addHistory = await firebaseApp.firestore()
          .collection('histories')
          .add({
            serial_number: serialNumber,
            current_ph: currentPh,
            current_ppm: currentPpm,
            created_at: new Date(),
          });

      const result = await addHistory.get();

      return res.status(200).json({
        message: 'Success to add device history',
        status: true,
        data: result.data(),
      });
    }

    return res.status(404).json({
      message: 'Failed to add device history',
      status: false,
      data: 'Device not found',
    });
  } catch (e) {
    return res.status(400).json({
      message: 'Failed to add device history',
      status: false,
      data: e.message,
    });
  }
});
router.get('/get-history/:id', async (req, res) => {
  try {
    const {
      id,
    } = req.params;

    const history = await firebaseApp.database()
        .ref('devices')
        .child(id)
        .get();

    if (history.exists()) {
      const historiesDocs = await firebaseApp.firestore()
          .collection('histories')
          .where('serial_number', '==', id)
          .get();

      const histories = [];

      historiesDocs.docs.forEach((result) => {
        histories.push(result.data());
      });

      return res.status(200).json({
        message: 'Success to add device history',
        status: true,
        data: histories,
      });
    }

    return res.status(404).json({
      message: 'Failed to add device history',
      status: false,
      data: 'Device not found',
    });
  } catch (e) {
    return res.status(400).json({
      message: 'Failed to get device history',
      status: false,
      data: e.message,
    });
  }
});

module.exports = router;
