const { Thought, User } = require("../models");

const thoughtController = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get thought by id
  async getThoughtById(req, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: req.params.id });

      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought with this ID" });
        return;
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // Create thought
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);

      const userData = await User.findOneAndUpdate(
        { _id: req.body.userID },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );

      res.json(userData);
      console.log(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update thought by id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought by ID" });
        return;
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete thought by id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
        return;
      }

      const userData = await User.findOneAndUpdate(
        { _id: req.body.userID },
        { $pull: { thoughts: thought._id } },
        { new: true }
      );

      res.json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = thoughtController;