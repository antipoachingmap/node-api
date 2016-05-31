var Media = require('../models/Media');

function mediaIndex(req, res) {
  Media.find().exec(function(err, media) {
    if(err) return res.status(500).json({ error: err });
    if(!media) return res.status(404).json({ message: "No media found." });

    return res.status(200).json(media);
  });
}

function mediaShow(req, res) {
  Media.findById(req.params.id).exec(function(err, media) {
    if(err) return res.status(500).json({ error: err });
    if(!media) return res.status(404).json({ message: "No media found." });

    return res.status(200).json(media);
  });
}

function mediaCreate(req, res) {
  Media.create(req.body, function(err, media) {
    if(err) return res.status(500).json({ error: err });

    return res.status(201).json(media);
  })
}

function mediaUpdate(req, res) {
  Media.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec(function(err, media) {
    if(err) return res.status(500).json({ error: err });
    if(!media) return res.status(404).json({ message: "No media found." });

    return res.status(200).json(media);
  });
}

module.exports = {
  index: mediaIndex,
  show: mediaShow,
  create: mediaCreate,
  update: mediaUpdate
}