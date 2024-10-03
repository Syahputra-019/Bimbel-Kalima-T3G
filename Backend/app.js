const express = require('express');
const app = express();
const db = require('./configs/db');

// Require models
const User = require('./models/users.js');
const Konsultan = require('./models/konsultans.js');
const Admin = require('./models/admins.js');
const Video = require('./models/videos.js');
const Transaksi = require('./models/transaksi.js');
const Konsultasi = require('./models/konsultasi.js');
const Modul = require('./models/modul.js');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Selamat datang di aplikasi Bimbel Kalima!');
});

// User routes
app.get('/users', (req, res) => {
  User.findAll().then((users) => {
    res.status(200).json(users);
  }).catch((err) => {
    res.status(500).send('Error fetching users: ' + err);
  });
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  User.findByPk(id).then((user) => {
    if (!user) {
      res.status(404).send('User  not found');
    } else {
      res.status(200).json(user);
    }
  }).catch((err) => {
    res.status(500).send('Error fetching user: ' + err);
  });
});

app.post('/users', (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  user.save().then(() => {
    res.status(201).send('User  created successfully!');
  }).catch((err) => {
    res.status(500).send('Error creating user: ' + err);
  });
});

app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  User.findByPk(id).then((user) => {
    if (!user) {
      res.status(404).send('User  not found');
    } else {
      user.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;
      user.save().then(() => {
        res.status(200).send('User  updated successfully!');
      }).catch((err) => {
        res.status(500).send('Error updating user: ' + err);
      });
    }
  }).catch((err) => {
    res.status(500).send('Error fetching user: ' + err);
  });
});

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  User.findByPk(id).then((user) => {
    if (!user) {
      res.status(404).send('User  not found');
    } else {
      user.destroy().then(() => {
        res.status(200).send('User  deleted successfully!');
      }).catch((err) => {
        res.status(500).send('Error deleting user: ' + err);
      });
    }
  }).catch((err) => {
    res.status(500).send('Error fetching user: ' + err);
  });
});

// Konsultan routes
app.get('/konsultans', (req, res) => {
  Konsultan.findAll().then((konsultans) => {
    res.status(200).json(konsultans);
  }).catch((err) => {
    res.status(500).send('Error fetching konsultans: ' + err);
  });
});

app.get('/konsultans/:id', (req, res) => {
  const id = req.params.id;
  Konsultan.findByPk(id).then((konsultan) => {
    if (!konsultan) {
      res.status(404).send('Konsultan not found');
    } else {
      res.status(200).json(konsultan);
    }
  }).catch((err) => {
    res.status(500).send('Error fetching konsultan: ' + err);
  });
});

app.post('/konsultans', (req, res) => {
  const konsultan = new Konsultan({
    user_id: req.body.user_id,
    specialization: req.body.specialization,
    bio: req.body.bio
  });

  konsultan.save().then(() => {
    res.status(201).send('Konsultan created successfully!');
  }).catch((err) => {
    res.status(500).send('Error creating konsultan: ' + err);
  });
});

app.put('/konsultans/:id', (req, res) => {
  const id = req.params.id;
  Konsultan.findByPk(id).then((konsultan) => {
    if (!konsultan) {
      res.status(404).send('Konsultan not found');
    } else {
      konsultan.user_id = req.body.user_id;
      konsultan.specialization = req.body.specialization;
      konsultan.bio = req.body.bio;
      konsultan.save().then(() => {
        res.status(200).send('Konsultan updated successfully!');
      }).catch((err) => {
        res.status(500).send('Error updating konsultan: ' + err);
      });
    }
  }).catch((err) => {
    res.status(500).send('Error fetching konsultan: ' + err);
  });
});

app.delete('/konsultans/:id', (req, res) => {
  const id = req.params.id;
  Konsultan.findByPk(id).then((konsultan) => {
    if (!konsultan) {
      res.status(404).send('Konsultan not found');
    } else {
      konsultan.destroy().then(() => {
        res.status(200).send('Konsultan deleted successfully!');
      }).catch((err) => {
        res.status(500).send('Error deleting konsultan: ' + err);
      });
    }
  }).catch((err) => {
    res.status(500).send('Error fetching konsultan: ' + err);
  });
});

// Admin routes
app.get('/admins', (req, res) => {
  Admin.findAll().then((admins) => {
    res.status(200).json(admins);
  }).catch((err) => {
    res.status(500).send('Error fetching admins: ' + err);
  });
});

app.get('/admins/:id', (req, res) => {
  const id = req.params.id;
  Admin.findByPk(id).then((admin) => {
    if (!admin) {
      res.status(404).send('Admin not found');
    } else {
      res.status(200).json(admin);
    }
  }).catch((err) => {
    res.status(500).send('Error fetching admin: ' + err);
  });
});

app.post('/admins', (req, res) => {
  const admin = new Admin({
    user_id: req.body.user_id
  });

  admin.save().then(() => {
    res.status(201).send('Admin created successfully!');
  }).catch((err) => {
    res.status(500).send('Error creating admin: ' + err);
  });
});

app.put('/admins/:id', (req, res) => {
  const id = req.params.id;
  Admin.findByPk(id).then((admin) => {
    if (!admin) {
      res.status(404).send('Admin not found');
    } else {
      admin.user_id = req.body.user_id;
      admin.save().then(() => {
        res.status(200).send('Admin updated successfully!');
      }).catch((err) => {
        res.status(500).send('Error updating admin: ' + err);
      });
    }
  }).catch((err) => {
    res.status(500).send('Error fetching admin: ' + err);
  });
});

app.delete('/admins/:id', (req, res) => {
  const id = req.params.id;
  Admin.findByPk(id).then((admin) => {
    if (!admin) {
      res.status(404).send('Admin not found');
    } else {
      admin.destroy().then(() => {
        res.status(200).send('Admin deleted successfully!');
      }).catch((err) => {
        res.status(500).send('Error deleting admin: ' + err);
      });
    }
  }).catch((err) => {
    res.status(500).send('Error fetching admin: ' + err);
  });
});

// Video routes
app.get('/videos', (req, res) => {
  Video.findAll().then((videos) => {
    res.status(200).json(videos);
  }).catch((err) => {
    res.status(500).send('Error fetching videos: ' + err);
  });
});

app.get('/videos/:id', (req, res) => {
  const id = req.params.id;
  Video.findByPk(id).then((video) => {
    if (!video) {
      res.status(404).send('Video not found');
    } else {
      res.status(200).json(video);
    }
  }).catch((err) => {
    res.status(500).send('Error fetching video: ' + err);
  });
});

app.post('/videos', (req, res) => {
  const video = new Video({
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    uploaded_by: req.body.uploaded_by
  });

  video.save().then(() => {
    res.status(201).send ('Video created successfully!');
  }).catch((err) => {
    res.status(500).send('Error creating video: ' + err);
  });
});

app.put('/videos/:id', (req, res) => {
  const id = req.params.id;
  Video.findByPk(id).then((video) => {
    if (!video) {
      res.status(404).send('Video not found');
    } else {
      video.title = req.body.title;
      video.description = req.body.description;
      video.url = req.body.url;
      video.uploaded_by = req.body.uploaded_by;
      video.save().then(() => {
        res.status(200).send('Video updated successfully!');
      }).catch((err) => {
        res.status(500).send('Error updating video: ' + err);
      });
    }
  }).catch((err) => {
    res.status(500).send('Error fetching video: ' + err);
  });
});

app.delete('/videos/:id', (req, res) => {
  const id = req.params.id;
  Video.findByPk(id).then((video) => {
    if (!video) {
      res.status(404).send('Video not found');
    } else {
      video.destroy().then(() => {
        res.status(200).send('Video deleted successfully!');
      }).catch((err) => {
        res.status(500).send('Error deleting video: ' + err);
      });
    }
  }).catch((err) => {
    res.status(500).send('Error fetching video: ' + err);
  });
});

// Transaksi routes
app.get('/transaksi', (req, res) => {
  Transaksi.findAll().then((transaksi) => {
    res.status(200).json(transaksi);
  }).catch((err) => {
    res.status(500).send('Error fetching transaksi: ' + err);
  });
});

app.get('/transaksi/:id', (req, res) => {
  const id = req.params.id;
  Transaksi.findByPk(id).then((transaksi) => {
    if (!transaksi) {
      res.status(404).send('Transaksi not found');
    } else {
      res.status(200).json(transaksi);
    }
  }).catch((err) => {
    res.status(500).send('Error fetching transaksi: ' + err);
  });
});

app.post('/transaksi', (req, res) => {
  const transaksi = new Transaksi({
    user_id: req.body.user_id,
    amount: req.body.amount,
    status: req.body.status
  });

  transaksi.save().then(() => {
    res.status(201).send('Transaksi created successfully!');
  }).catch((err) => {
    res.status(500).send('Error creating transaksi: ' + err);
  });
});

app.put('/transaksi/:id', (req, res) => {
  const id = req.params.id;
  Transaksi.findByPk(id).then((transaksi) => {
    if (!transaksi) {
      res.status(404).send('Transaksi not found');
    } else {
      transaksi.user_id = req.body.user_id;
      transaksi.amount = req.body.amount;
      transaksi.status = req.body.status;
      transaksi.save().then(() => {
        res.status(200).send('Transaksi updated successfully!');
      }).catch((err) => {
        res.status(500).send('Error updating transaksi: ' + err);
      });
    }
  }).catch((err) => {
    res.status(500).send('Error fetching transaksi: ' + err);
  });
});

app.delete('/transaksi/:id', (req, res) => {
  const id = req.params.id;
  Transaksi.findByPk(id).then((transaksi) => {
    if (!transaksi) {
      res.status(404).send('Transaksi not found');
    } else {
      transaksi.destroy().then(() => {
        res.status(200).send('Transaksi deleted successfully!');
      }).catch((err) => {
        res.status(500).send('Error deleting transaksi: ' + err);
      });
    }
  }).catch((err) => {
    res.status(500).send('Error fetching transaksi: ' + err);
  });
});

// Konsultasi routes
app.get('/konsultasi', (req, res) => {
  Konsultasi.findAll().then((konsultasi) => {
    res.status(200).json(konsultasi);
  }).catch((err) => {
    res.status(500).send('Error fetching konsultasi: ' + err);
  });
});

app.get('/konsultasi/:id', (req, res) => {
  const id = req.params.id;
  Konsultasi.findByPk(id).then((konsultasi) => {
    if (!konsultasi) {
      res.status(404).send('Konsultasi not found');
    } else {
      res.status(200).json(konsultasi);
    }
  }).catch((err) => {
    res.status(500).send('Error fetching konsultasi: ' + err);
  });
});

app.post('/konsultasi', (req, res) => {
  const konsultasi = new Konsultasi({
    student_id: req.body.student_id,
    konsultant_id: req.body.konsultant_id,
    consultation_time: req.body.consultation_time,
    notes: req.body.notes
  });

  konsultasi.save().then(() => {
    res.status(201).send('Konsultasi created successfully!');
  }).catch((err) => {
    res.status(500).send('Error creating konsultasi: ' + err);
  });
});

app.put('/konsultasi/:id', (req, res) => {
  const id = req.params.id;
  Konsultasi.findByPk(id).then((konsultasi) => {
    if (!konsultasi) {
      res.status(404).send('Konsultasi not found');
    } else {
      konsultasi.student_id = req.body.student_id;
      konsultasi.konsultant_id = req.body.konsultant_id;
      konsultasi.consultation_time = req.body.consultation_time;
      konsultasi.notes = req.body.notes;
      konsultasi.save().then(() => {
        res.status(200).send('Konsultasi updated successfully!');
      }).catch((err) => {
        res.status(500).send('Error updating konsultasi: ' + err);
      });
    }
  }).catch((err) => {
    res.status(500).send('Error fetching konsultasi: ' + err);
  });
});

app.delete('/konsultasi/:id', (req, res) => {
  const id = req.params.id;
  Konsultasi.findByPk(id).then((konsultasi) => {
    if (!konsultasi) {
      res.status(404).send('Konsultasi not found');
    } else {
      konsultasi.destroy().then(() => {
        res.status(200).send('Konsultasi deleted successfully!');
      }).catch((err) => {
        res.status(500).send('Error deleting konsultasi: ' + err);
      });
    }
  }).catch((err) => {
    res.status(500).send('Error fetching konsultasi: ' + err);
  });
});

// Modul routes
app.get('/modul', (req, res) => {
  Modul.findAll().then((modul) => {
    res.status(200).json(modul);
  }).catch((err) => {
    res.status(500).send('Error fetching modul: ' + err);
  });
});

app.get('/modul/:id', (req, res) => {
  const id = req.params.id;
  Modul.findByPk(id).then((modul) => {
    if (!modul) {
      res.status(404).send('Modul not found');
    } else {
      res.status(200).json(modul);
    }
  }).catch((err) => {
    res.status(500).send('Error fetching modul: ' + err);
  });
});

app.post('/modul', (req, res) => {
  const modul = new Modul({
    title: req.body.title,
    description: req.body.description,
    video_id: req.body.video_id
  });

  modul.save().then(() => {
    res.status(201).send('Modul created successfully!');
  }).catch((err) => {
    res.status(500).send('Error creating modul: ' + err);
  });
});

app.put('/modul/:id', (req, res) => {
  const id = req.params.id;
  Modul.findByPk(id).then((modul) => {
    if (!modul) {
      res.status(404).send('Modul not found');
    } else {
      modul.title = req.body.title;
      modul.description = req.body.description;
      modul.video_id = req.body.video_id;
      modul.save().then(() => {
        res.status(200).send('Modul updated successfully!');
      }).catch((err) => {
        res.status(500).send('Error updating modul: ' + err);
      });
    }
  }).catch((err) => {
    res.status(500).send('Error fetching modul: ' + err);
  });
});

app.delete('/modul/:id', (req, res) => {
 const id = req.params.id;
  Modul.findByPk(id).then((modul) => {
    if (!modul) {
      res.status(404).send('Modul not found');
    } else {
      modul.destroy().then(() => {
        res.status(200).send('Modul deleted successfully!');
      }).catch((err) => {
        res.status(500).send('Error deleting modul: ' + err);
      });
    }
  }).catch((err) => {
    res.status(500).send('Error fetching modul: ' + err);
  });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});