const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController");

// Get all thoughts
router.get(getAllThoughts);

// Get thought by id
router.get("/:thoughtId", getThoughtById);

// Create thought
router.post("/", createThought);

//Update thought
router.put("/:thoughtId", updateThought);

// Delete thought by Id
router.delete("/:thoughtId", deleteThought);

module.exports = router;