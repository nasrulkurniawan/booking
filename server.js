const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Memuat variabel lingkungan dari file .env

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({
    exposedHeaders: ['x-total-count']
}));

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const instansiRoutes = require('./routes/instansiRoutes');
const jadwalRoutes = require('./routes/jadwalRoutes');

// Use routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', instansiRoutes);
app.use('/api', jadwalRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
