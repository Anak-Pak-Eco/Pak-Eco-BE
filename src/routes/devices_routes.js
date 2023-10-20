const express = require('express');
const {
  getDevices,
  getDeviceById,
  updateDevice,
  deleteDevice,
} = require('../controllers/devices_controller');

const router = new express.Router();

router.get('/get-devices', getDevices);
router.get('/get-device/:id', getDeviceById);
router.post('/update', updateDevice);
router.delete('/delete/:id', deleteDevice);

module.exports = router;
