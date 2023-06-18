const express = require("express");
const {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/UserController.js");
const { verifyUser, adminOnly } = require("../middleware/authUser.js");

const router = express.Router();

router.post("/users", verifyUser, adminOnly, createUser);
router.get("/users", verifyUser, adminOnly, getUser);
router.get("/users/:id", verifyUser, adminOnly, getUserById);
router.patch("/users/:id", verifyUser, adminOnly, updateUser);
router.delete("/users/:id", verifyUser, adminOnly, deleteUser);

module.exports = router;
