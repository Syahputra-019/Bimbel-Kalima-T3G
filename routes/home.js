const express = require('express');
const router = express.Router();

// Route untuk halaman beranda
router.get('/', (req, res) => {
    res.send('Selamat datang di halaman Home!');
});

module.exports = router;
