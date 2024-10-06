const express = require('express');
const router = express.Router();
 const Modul = require('../models/moduls');

router.get('/', (req, res) => {
  Modul.findAll().then((modul) => {
    res.status(200).json(modul);
  }).catch((err) => {
    res.status(500).send('Error fetching modul: ' + err);
  });
});

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;