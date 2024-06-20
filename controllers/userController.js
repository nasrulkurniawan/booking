const db = require('../models/db');

exports.getStats = (req, res) => {
  let stats = {};

  // Total instansi
  let totalInstansiSql = 'SELECT COUNT(*) AS total FROM instansi';
  db.query(totalInstansiSql, (err, totalInstansiResults) => {
    if (err) throw err;
    stats.totalInstansi = totalInstansiResults[0].total;

    // Total submit
    let totalSubmitSql = 'SELECT COUNT(*) AS total FROM users';
    db.query(totalSubmitSql, (err, totalSubmitResults) => {
      if (err) throw err;
      stats.totalSubmit = totalSubmitResults[0].total;

      // Total belum submit
      let totalBelumSubmitSql = 'SELECT COUNT(*) AS total FROM instansi WHERE used_count = 0';
      db.query(totalBelumSubmitSql, (err, totalBelumSubmitResults) => {
        if (err) throw err;
        stats.totalBelumSubmit = totalBelumSubmitResults[0].total;

        res.json(stats);
      });
    });
  });
};

exports.submit = (req, res) => {
  const { name, nip, email, whatsapp, instansi, jadwal } = req.body;

  // Validasi field
  let errors = {};
  if (!name) errors.name = 'Nama wajib diisi';
  if (!email) errors.email = 'Email wajib diisi';
  if (!nip) errors.nip = 'NIP wajib diisi';
  if (!whatsapp) errors.whatsapp = 'Whatsapp wajib diisi';
  if (!instansi) errors.instansi = 'Instansi wajib dipilih';
  if (!jadwal) errors.jadwal = 'Jadwal wajib dipilih';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  // Periksa apakah kombinasi instansi_id dan tanggal sudah ada
  let checkSql = 'SELECT COUNT(*) AS count FROM users WHERE instansi_id = ? AND tanggal = ?';
  db.query(checkSql, [instansi, jadwal], (err, results) => {
    if (err) throw err;

    if (results[0].count > 0) {
      return res.status(400).json({ error: 'Kombinasi instansi dan jadwal ini sudah ada' });
    }

    // Jika belum ada, lanjutkan untuk menyimpan data
    let data = { name, nip, email, whatsapp, instansi_id: instansi, tanggal: jadwal };
    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql, data, (err, result) => {
      if (err) throw err;

      // Update used_count untuk instansi dan jadwal
      let updateInstansiSql = 'UPDATE instansi SET used_count = used_count + 1 WHERE id = ?';
      db.query(updateInstansiSql, [instansi], (err, result) => {
        if (err) throw err;
      });

      let updateJadwalSql = 'UPDATE jadwal SET used_count = used_count + 1 WHERE tanggal = ?';
      db.query(updateJadwalSql, [jadwal], (err, result) => {
        if (err) throw err;
        res.send('Data berhasil ditambahkan');
      });
    });
  });
};

exports.updateUser = (req, res) => {
  const { name, nip, email, whatsapp, instansi, jadwal } = req.body;

  // Validate fields
  let errors = {};
  if (!name) errors.name = 'Name is required';
  if (!nip) errors.nip = 'NIP is required';
  if (!email) errors.email = 'Email is required';
  if (!whatsapp) errors.whatsapp = 'Whatsapp is required';
  if (!instansi) errors.instansi = 'Instansi is required';
  if (!jadwal) errors.jadwal = 'Jadwal is required';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const id = req.params.id;

  // Retrieve current user data
  let getUserSql = 'SELECT instansi_id, tanggal FROM users WHERE id = ?';
  db.query(getUserSql, [id], (err, user) => {
    if (err) throw err;

    const oldInstansiId = user[0].instansi_id;
    const oldTanggal = user[0].tanggal;

    // Reduce the used_count in instansi and jadwal
    let updateOldInstansiSql = 'UPDATE instansi SET used_count = used_count - 1 WHERE id = ?';
    db.query(updateOldInstansiSql, [oldInstansiId], (err, result) => {
      if (err) throw err;

      let updateOldJadwalSql = 'UPDATE jadwal SET used_count = used_count - 1 WHERE tanggal = ?';
      db.query(updateOldJadwalSql, [oldTanggal], (err, result) => {
        if (err) throw err;

        // Now update the user data
        let data = { name, nip, email, whatsapp, instansi_id: instansi, tanggal: jadwal };
        let updateUserSql = 'UPDATE users SET ? WHERE id = ?';
        db.query(updateUserSql, [data, id], (err, result) => {
          if (err) throw err;

          // Increment the used_count in new instansi and jadwal
          let updateNewInstansiSql = 'UPDATE instansi SET used_count = used_count + 1 WHERE id = ?';
          db.query(updateNewInstansiSql, [instansi], (err, result) => {
            if (err) throw err;

            let updateNewJadwalSql = 'UPDATE jadwal SET used_count = used_count + 1 WHERE tanggal = ?';
            db.query(updateNewJadwalSql, [jadwal], (err, result) => {
              if (err) throw err;
              res.send('Data updated...');
            });
          });
        });
      });
    });
  });
};

exports.getUsers = (req, res) => {
  const { page = 1, pageSize = 10, search = '', instansi, sortField = 'id', sortOrder = 'descend' } = req.query;
  const offset = (page - 1) * pageSize;
  const order = sortOrder === 'descend' ? 'DESC' : 'ASC';

  let countSql = `SELECT COUNT(*) AS total FROM users WHERE (name LIKE ? OR email LIKE ?)`;
  let countParams = [`%${search}%`, `%${search}%`];

  if (instansi) {
    countSql += ` AND instansi_id = ?`;
    countParams.push(instansi);
  }

  let countQuery = db.query(countSql, countParams, (err, countResults) => {
    if (err) throw err;

    let total = countResults[0].total;

    let sql = `
      SELECT users.*, instansi.name as instansi_name 
      FROM users 
      LEFT JOIN instansi ON users.instansi_id = instansi.id 
      WHERE (users.name LIKE ? OR users.email LIKE ?)`;

    let queryParams = [`%${search}%`, `%${search}%`];

    if (instansi) {
      sql += ` AND users.instansi_id = ?`;
      queryParams.push(instansi);
    }

    sql += ` ORDER BY ${sortField} ${order} LIMIT ? OFFSET ?`;

    queryParams.push(parseInt(pageSize), parseInt(offset));

    let query = db.query(sql, queryParams, (err, results) => {
      if (err) throw err;

      // Check if user is logged in
      const isAuthenticated = req.user && req.user.id;

      if (!isAuthenticated) {
        // If not logged in, mask sensitive information
        results = results.map(user => ({
          ...user,
          name: maskName(user.name),
          email: maskEmail(user.email),
          whatsapp: maskPhone(user.whatsapp)
        }));
      }

      res.set('x-total-count', total);
      res.json(results);
    });
  });
};

const maskName = (name) => {
  if (!name) return name;
  const parts = name.split(' ');
  if (parts.length === 1) {
    // Jika hanya ada satu kata, sensor seluruh kata
    return '*'.repeat(parts[0].length);
  }
  // Sensor kata pertama saja
  const firstPart = '*'.repeat(parts[0].length);
  const remainingParts = parts.slice(1).join(' ');
  return `${firstPart} ${remainingParts}`;
};

const maskEmail = (email) => {
  if (!email) return email;
  const [localPart, domain] = email.split('@');
  return '*'.repeat(localPart.length) + '@' + domain;
};

const maskPhone = (phone) => {
  if (!phone) return phone;
  return phone.slice(0, 5) + '*'.repeat(phone.length - 5);
};

// tidak terauth maka sensor beberapa data.
exports.getUserssensor = (req, res) => {
  const { page = 1, pageSize = 10, search = '', instansi, sortField = 'id', sortOrder = 'descend' } = req.query;
  const offset = (page - 1) * pageSize;
  const order = sortOrder === 'descend' ? 'DESC' : 'ASC';

  let countSql = `SELECT COUNT(*) AS total FROM users WHERE (name LIKE ? OR email LIKE ?)`;
  let countParams = [`%${search}%`, `%${search}%`];

  if (instansi) {
    countSql += ` AND instansi_id = ?`;
    countParams.push(instansi);
  }

  let countQuery = db.query(countSql, countParams, (err, countResults) => {
    if (err) throw err;

    let total = countResults[0].total;

    let sql = `
      SELECT users.*, instansi.name as instansi_name 
      FROM users 
      LEFT JOIN instansi ON users.instansi_id = instansi.id 
      WHERE (users.name LIKE ? OR users.email LIKE ?)`;

    let queryParams = [`%${search}%`, `%${search}%`];

    if (instansi) {
      sql += ` AND users.instansi_id = ?`;
      queryParams.push(instansi);
    }

    sql += ` ORDER BY ${sortField} ${order} LIMIT ? OFFSET ?`;

    queryParams.push(parseInt(pageSize), parseInt(offset));

    let query = db.query(sql, queryParams, (err, results) => {
      if (err) throw err;

        // If not logged in, mask sensitive information
        results = results.map(user => ({
          ...user,
          name: maskName(user.name),
          email: maskEmail(user.email),
          whatsapp: maskPhone(user.whatsapp)
        }));

      res.set('x-total-count', total);
      res.json(results);
    });
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  let getUserSql = 'SELECT instansi_id, tanggal FROM users WHERE id = ?';
  db.query(getUserSql, [id], (err, user) => {
    if (err) throw err;

    let sql = 'DELETE FROM users WHERE id = ?';
    let query = db.query(sql, id, (err, result) => {
      if (err) throw err;

      // Update used_count for instansi and jadwal
      let updateInstansiSql = 'UPDATE instansi SET used_count = used_count - 1 WHERE id = ?';
      db.query(updateInstansiSql, [user[0].instansi_id], (err, result) => {
        if (err) throw err;
      });
      
      let updateJadwalSql = 'UPDATE jadwal SET used_count = used_count - 1 WHERE tanggal = ?';
      db.query(updateJadwalSql, [user[0].tanggal], (err, result) => {
        if (err) throw err;
        res.send('Data deleted...');
      });
    });
  });
};
