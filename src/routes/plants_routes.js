const express = require('express');
const {
  getPlants,
  addPlants,
  editPlants,
  deletePlant,
} = require('../controllers/plants_controller');

const router = new express.Router();

router.get('/', getPlants);
router.post('/', addPlants);
router.put('/:id', editPlants);
router.delete('/:id', deletePlant);

module.exports = router;
