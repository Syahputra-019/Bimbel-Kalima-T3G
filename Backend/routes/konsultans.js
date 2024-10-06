const express = require('express');
const router = express.Router();
const Konsultan = require('../models/konsultans');

router.get('/', (req, res) => {
  Konsultan.findAll().then((konsultans) => {
    res.status(200).json(konsultans);
  }).catch((err) => {
    res.status(500).send('Error fetching konsultans: ' + err);
  });
});

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;