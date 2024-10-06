const express = require('express');
const router = express.Router();
const Video = require('../models/videos');

router.get('/', (req, res) => {
  Video.findAll().then((videos) => {
    res.status(200).json(videos);
  }).catch((err) => {
    res.status(500).send('Error fetching videos: ' + err);
  });
});

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
  const video = new Video({
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    uploaded_by: req.body.uploaded_by
  });

  video.save().then(() => {
    res.status(201).send('Video created successfully!');
  }).catch((err) => {
    res.status(500).send('Error creating video: ' + err);
  });
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;