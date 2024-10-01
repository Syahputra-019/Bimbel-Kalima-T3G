const express = require('express');
const app = express();
const port = 3000;

// Import koneksi dan model
const sequelize = require('./configs/db.js');
const Course = require('./models/courses.js');

// Import router
const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk rute
app.use('/', homeRouter);
app.use('/login', loginRouter);

// Sinkronisasi dengan database (hanya pertama kali)
sequelize.sync()
  .then(() => console.log('Sinkronisasi database selesai.'));

// ** Read - Mendapatkan semua kursus **
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data kursus.' });
  }
});

// ** Create - Menambah kursus baru **
app.post('/courses', async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCourse = await Course.create({ name, description });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: 'Gagal menambah kursus.' });
  }
});

// ** Update - Mengubah kursus berdasarkan ID **
app.put('/courses/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ error: 'Kursus tidak ditemukan.' });
    }
    course.name = name;
    course.description = description;
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Gagal memperbarui kursus.' });
  }
});

// ** Delete - Menghapus kursus berdasarkan ID **
app.delete('/courses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ error: 'Kursus tidak ditemukan.' });
    }
    await course.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus kursus.' });
  }const express = require('express');
  const app = express();
  const port = 3000;
  
  // Import koneksi dan model
  const sequelize = require('./configs/db.js');
  const Course = require('./models/courses.js');
  
  // Import router
  const homeRouter = require('./routes/home');
  const loginRouter = require('./routes/login');
  
  // Middleware
  app.use(express.json()); // Parsing JSON untuk body request
  
  // Sinkronisasi dengan database
  sequelize.sync()
    .then(() => console.log('Sinkronisasi database selesai.'))
    .catch(err => console.error('Error sinkronisasi database:', err));
  
  // Route untuk halaman Home
  app.use('/', homeRouter); // Menggunakan route dari home.js
  
  // Route untuk login
  app.use('/login', loginRouter); // Menggunakan route dari login.js
  
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
  
});

// Server listening
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
