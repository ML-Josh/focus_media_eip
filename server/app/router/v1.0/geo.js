const express = require('express');
const geoController = require('~server/app/controller/v1.0/geoController');

const router = express.Router();

router.get('/commercial', geoController.commercial);
router.get('/residential', geoController.residential);
// router.get('/geo', geoController.residential);

module.exports = router;
