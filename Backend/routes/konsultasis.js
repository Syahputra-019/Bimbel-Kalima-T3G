const express = require('express');
const router = express.Router();
const Konsultasi = require('../models/konsultasis');

router.get('/', (req, res) => {
  Konsultasi.findAll().then((konsultasi) => {
    res.status(200).json(konsultasi);
  }).catch((err) => {
    res.status(500).send('Error fetching konsultasi: ' + err);
  });
});

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;