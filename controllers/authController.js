const db = require('../models/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

exports.register = (req, res) => {
  const { username, password } = req.body;
  db.query('INSERT INTO admin (username, password) VALUES (?, ?)', [username, password], (err, result) => {
    if (err) throw err;
    res.send('Admin registered...');
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM admin WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).send('Internal server error');
    if (results.length === 0) return res.status(400).send('Invalid credentials');
    
    const admin = results[0];
    if (password !== admin.password) return res.status(400).send('Invalid credentials');
    
    const token = jwt.sign({ id: admin.id }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  });
};

exports.logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).send('Access denied');

  const token = authHeader.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');
  
  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};
