// controllers/jadwalController.js
const Jadwal = require('../models/Jadwal');
const moment = require('moment-timezone');

exports.getAvailableJadwal = (req, res) => {
  Jadwal.getAvailableJadwal((err, results) => {
    if (err) return res.status(500).send(err);
    
    // Format the dates to the desired timezone
    const formattedResults = results.map(jadwal => ({
      ...jadwal,
      tanggal: moment(jadwal.tanggal).tz('Asia/Jakarta').format('YYYY-MM-DD')
    }));

    res.json(formattedResults);
  });
};

exports.bookJadwal = (req, res) => {
  const id = req.params.id;
  Jadwal.bookJadwal(id, (err, results) => {
    if (err) return res.status(500).send(err);
    res.send('Jadwal booked successfully');
  });
};
