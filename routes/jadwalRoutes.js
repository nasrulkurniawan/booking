const express = require('express');
const router = express.Router();
const jadwalController = require('../controllers/jadwalController');

router.get('/jadwal', jadwalController.getAvailableJadwal);
router.post('/jadwal/:id/book', jadwalController.bookJadwal);

module.exports = router;
