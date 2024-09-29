const express = require('express');
const app = express();
const port = 3000;

// Import koneksi dan model
const sequelize = require('./db');
const Course = require('./models/course');

app.use(express.json());

// Sinkronisasi dengan database (hanya pertama kali)
sequelize.sync()
  .then(() => console.log('Sinkronisasi database selesai.'));

// ** Read - Mendapatkan semua kursus **
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.findAll(); // Mengambil semua kursus dari tabel
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data kursus.' });
  }
});

// ** Create - Menambah kursus baru **
app.post('/courses', async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCourse = await Course.create({ name, description }); // Tambah kursus baru
    res.status(201).json(newCourse); // Mengembalikan status 201 Created
  } catch (error) {
    res.status(500).json({ error: 'Gagal menambah kursus.' });
  }
});

// ** Update - Mengubah kursus berdasarkan ID **
app.put('/courses/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const course = await Course.findByPk(id); // Mencari kursus berdasarkan ID
    if (!course) {
      return res.status(404).json({ error: 'Kursus tidak ditemukan.' });
    }
    course.name = name; // Update nama kursus
    course.description = description; // Update deskripsi kursus
    await course.save(); // Simpan perubahan ke database
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Gagal memperbarui kursus.' });
  }
});

// ** Delete - Menghapus kursus berdasarkan ID **
app.delete('/courses/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findByPk(id); // Mencari kursus berdasarkan ID
    if (!course) {
      return res.status(404).json({ error: 'Kursus tidak ditemukan.' });
    }
    await course.destroy(); // Menghapus kursus dari database
    res.status(204).send(); // Mengembalikan status 204 No Content
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus kursus.' });
  }
});

// Server listening
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
