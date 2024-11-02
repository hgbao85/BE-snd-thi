const express = require('express');
const router = express.Router();
const ageController = require('../controllers/ageController');

router.post('/', ageController.calculateAge);

module.exports = router;