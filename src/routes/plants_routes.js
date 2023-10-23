const express = require('express');
const {
  getPlants,
  addPlants,
  editPlants,
} = require('../controllers/plants_controller');

const router = new express.Router();

router.get('/', getPlants);
router.post('/', addPlants);
router.put('/:id', editPlants);

module.exports = router;
