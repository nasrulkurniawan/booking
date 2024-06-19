const db = require('../models/db');

exports.getInstansi = (req, res) => {
  // let sql = 'SELECT id, name FROM instansi';
  // let query = db.query(sql, (err, results) => {
  //   if (err) throw err;
  //   res.json(results);
  // });
  const sql = `
    SELECT i.id, i.name
    FROM instansi i
    LEFT JOIN users u ON i.id = u.instansi_id
    GROUP BY i.id
    HAVING COUNT(u.id) = 0
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send('Internal server error');
    res.json(results);
  });
};

exports.getInstansiFilter = (req, res) => {
  let sql = 'SELECT id, name FROM instansi';
  // let query = db.query(sql, (err, results) => {
  //   if (err) throw err;
  //   res.json(results);
  // });  
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send('Internal server error');
    res.json(results);
  });
};
