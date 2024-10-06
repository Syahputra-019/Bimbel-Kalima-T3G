const { Sequelize } = require('sequelize');

// Menghubungkan ke database MySQL
const sequelize = new Sequelize('bimbel_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306 // Perbaiki port di sini
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/users.js")(db.sequelize, db.Sequelize);
db.konsultans = require("../models/konsultans.js")(db.sequelize, db.Sequelize);
db.admins = require("../models/admins.js")(db.sequelize, db.Sequelize);
db.videos = require("../models/videos.js")(db.sequelize, db.Sequelize);
db.transaksi = require("../models/transaksis.js")(db.sequelize, db.Sequelize);
db.konsultasi = require("../models/konsultasis.js")(db.sequelize, db.Sequelize);
db.modul = require("../models/moduls.js")(db.sequelize, db.Sequelize);

// Mengecek koneksi ke database
sequelize.authenticate()
  .then(() => console.log('Koneksi ke database berhasil.'))
  .catch(err => console.error('Tidak bisa terkoneksi ke database:', err));

module.exports = sequelize;
