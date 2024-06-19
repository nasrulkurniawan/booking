// models/Jadwal.js
const db = require('../models/db');

const Jadwal = {
  getAvailableJadwal: (callback) => {
    const sql = 'SELECT * FROM jadwal WHERE used_count < 2';
    db.query(sql, callback);
  },

  bookJadwal: (id, callback) => {
    const sql = 'UPDATE jadwal SET used_count = used_count + 1 WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = Jadwal;
