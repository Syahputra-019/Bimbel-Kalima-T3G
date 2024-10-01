const express = require('express');
const router = express.Router();

// Dummy user untuk contoh login
const user = {
    username: "admin",
    password: "password123"
};

// Route untuk halaman login
router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Cek username dan password
    if (username === user.username && password === user.password) {
        res.json({ message: "Login berhasil!" });
    } else {
        res.status(401).json({ message: "Login gagal, username atau password salah." });
    }
});

module.exports = router;
