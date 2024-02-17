const { Thought, User } = require("../models");

const userController = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get user by id
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });

      if (!user) {
        res.status(404).json({ message: "No user with that ID" });
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update user by id
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No user" });
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });

      if (!user) {
        res.status(404).json({ message: "No user with that ID" });
        return;
      }

      await Thought.deleteMany({
        _id: {
          $in: user.thoughts,
        },
      });

      res.json({ message: "User deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add Friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendsId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No user found with that ID" });
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove Friend
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendsId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No friend found with that ID" });
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;