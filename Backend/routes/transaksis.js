const express = require('express');
const router = express.Router();
const Transaksi = require('../models/transaksis');

router.get('/', (req, res) => {
  Transaksi.findAll().then((transaksi) => {
    res.status(200).json(transaksi);
  }).catch((err) => {
    res.status(500).send('Error fetching transaksi: ' + err);
  });
});

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;