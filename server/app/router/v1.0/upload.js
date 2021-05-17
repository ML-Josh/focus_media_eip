const express = require('express');
const uploadController = require('~server/app/controller/v1.0/uploadController');

const router = express.Router();

router.get('/commercial', uploadController.commercial);
router.get('/residential', uploadController.residential);

module.exports = router;
