const express = require('express');
const router = express.Router();
const Admin = require('../models/admins');

router.get('/', (req, res) => {
  Admin.findAll().then((admins) => {
    res.status(200).json(admins);
  }).catch((err) => {
    res.status(500).send('Error fetching admins: ' + err);
  });
});

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
  const admin = new Admin({
    user_id: req.body.user_id
  });

  admin.save().then(() => {
    res.status(201).send('Admin created successfully!');
  }).catch((err) => {
    res.status(500).send('Error creating admin: ' + err);
  });
});

router.put('/:id', (req, res) => {
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
    res.status(500 ).send('Error fetching admin: ' + err);
  });
});

router.delete('/:id', (req, res) => {
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

module.exports = router;