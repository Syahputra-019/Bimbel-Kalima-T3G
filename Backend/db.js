const { Sequelize } = require('sequelize');

// Menghubungkan ke database MySQL
const sequelize = new Sequelize('bimbel_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306 // Perbaiki port di sini
});

// Mengecek koneksi ke database
sequelize.authenticate()
  .then(() => console.log('Koneksi ke database berhasil.'))
  .catch(err => console.error('Tidak bisa terkoneksi ke database:', err));

module.exports = sequelize;
