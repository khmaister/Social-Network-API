const {User } = require("../models");

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
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'No user with this id' });
          return;
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
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
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'No user with this id' });
          return;
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  // Delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },

  // Add Friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendsId } },
      { new: true, runValidators: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with this ID" });
          return;
        }
        console.log("Friend added successfully");
        res.json(user);
      })
      .catch((err) => {
        console.error("Error adding friend:", err);
        res.status(500).json(err);
      });
  },

  // Remove Friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendsId } },
      { new: true, runValidators: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },
};

module.exports = userController;