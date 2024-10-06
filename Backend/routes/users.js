const express = require('express');
const router = express.Router();
const User = require('../models/users');
const db = require('../configs/db');
const user = db.users;

router.get('/', (req, res) => {
  User.findAll().then((users) => {
    res.status(200).json(users);
  }).catch((err) => {
    res.status(500).send('Error fetching users: ' + err);
  });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.users.findByPk(id).then((user) => {
      if (!user) {
        res.status(404).send('User  not found');
      } else {
        res.status(200).json(user);
      }
    }).catch((err) => {
      res.status(500).send('Error fetching user: ' + err);
    });
  });

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;