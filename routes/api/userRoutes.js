const router = require("express").Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
  } = require("../../controllers/userController");

// Get all users
router.get("/", getAllUsers);

// Get user by id
router.get("/:userId", getUserById);

// Create new user
router.post("/", createUser);

// Update user by id
router.put("/:userId", updateUser);

// Delete user by id
router.delete("/:userId", deleteUser)

// Add friend
router.post("/:userId/friends/friendsId", addFriend);

// Remove friend
router.delete("/:userId/friends/friendsId", removeFriend);