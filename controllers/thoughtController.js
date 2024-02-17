const { Thought, User } = require("../models");

const thoughtController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(404).json(err));
},

  // Get thought by id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .select("-__v")
    .then((thought) => {
      if (!thought) {
        res.status(404).json({ message: "No thoughts with this id!" });
        return;
      }
      res.json(thought);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
},

  // Create thought
  createThought({ params, body }, res) {
    Thought.create(body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { username: body.username },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then((thought) => {
      if (!thought) {
        res.status(404).json({ message: "No thoughts found with this ID" });
        return;
      }
      res.json(thought);
    })
    .catch((err) => res.json(err));
},
  // Update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
      .select("-__v")
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thoughts with this ID!" });
          return;
        }
        res.json(thought); 
      })
      .catch((err) => res.json(err));
  },

  // Delete thought by id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;