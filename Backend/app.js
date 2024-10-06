const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./configs/db.js');

// Require models
const User = require('./models/users.js');
const Konsultan = require('./models/konsultans.js');
const Admin = require('./models/admins.js');
const Video = require('./models/videos.js');
const Transaksi = require('./models/transaksis.js');
const Konsultasi = require('./models/konsultasis.js');
const Modul = require('./models/moduls.js');

// Add middleware body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add middleware to handle JSON errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ message: 'JSON tidak valid' });
  }
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Selamat datang di aplikasi Bimbel Kalima!');
});

// User routes
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// Konsultan routes
const konsultanRoutes = require('./routes/konsultans');
app.use('/konsultans', konsultanRoutes);

// Admin routes
const adminRoutes = require('./routes/admins');
app.use('/admins', adminRoutes);

// Video routes
const videoRoutes = require('./routes/videos');
app.use('/videos', videoRoutes);

// Transaksi routes
const transaksiRoutes = require('./routes/transaksis');
app.use('/transaksi', transaksiRoutes);

// Konsultasi routes
const konsultasiRoutes = require('./routes/konsultasis');
app.use('/konsultasi', konsultasiRoutes);

// Modul routes
const modulRoutes = require('./routes/moduls');
app.use('/modul', modulRoutes);

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});