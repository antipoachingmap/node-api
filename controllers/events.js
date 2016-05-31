var Event = require('../models/Event');

function eventIndex(req, res) {
  Event.find().exec(function(err, events) {
    if(err) return res.status(500).json({ error: err });
    if(!events) return res.status(404).json({ message: "No events found." });

    return res.status(200).json(events);
  });
}

function eventShow(req, res) {
  Event.findById(req.params.id).exec(function(err, event) {
    if(err) return res.status(500).json({ error: err });
    if(!event) return res.status(404).json({ message: "No event found." });

    return res.status(200).json(event);
  });
}

function eventCreate(req, res) {
  Event.create(req.body, function(err, event) {
    if(err) return res.status(500).json({ error: err });

    return res.status(201).json(event);
  })
}

function eventUpdate(req, res) {
  Event.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec(function(err, event) {
    if(err) return res.status(500).json({ error: err });
    if(!event) return res.status(404).json({ message: "No event found." });

    return res.status(200).json(event);
  });
}

module.exports = {
  index: eventIndex,
  show: eventShow,
  create: eventCreate,
  update: eventUpdate
}