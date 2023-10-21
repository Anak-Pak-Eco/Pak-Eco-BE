const express = require('express');
const {
  getDevices,
  getDeviceById,
  updateDevice,
  deleteDevice,
  addHistoryDevice,
  getDeviceHistories,
} = require('../controllers/devices_controller');

const router = new express.Router();

router.get('/get-devices', getDevices);
router.get('/get-device/:id', getDeviceById);
router.post('/update', updateDevice);
router.delete('/delete/:id', deleteDevice);
router.post('/add-history', addHistoryDevice);
router.get('/get-history/:id', getDeviceHistories);

module.exports = router;
