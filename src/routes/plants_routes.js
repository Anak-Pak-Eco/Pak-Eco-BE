const express = require('express');
const {getPlants, addPlants} = require('../controllers/plants_controller');

const router = new express.Router();

router.get('/', getPlants);
router.post('/', addPlants);

module.exports = router;
