const express = require('express');
const router = express.Router();
const instansiController = require('../controllers/instansiController');
const authController = require('../controllers/authController');

router.get('/instansi', instansiController.getInstansi);
router.get('/instansifilter', instansiController.getInstansiFilter);

module.exports = router;
