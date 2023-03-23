import express from "express";
import { getUser, getUserById, createUser, updateUser, deleteUser } from "../controllers/UserController.js";
import { verifyUser, adminOnly } from "../middleware/authUser.js";

const router = express.Router()

// CREATE - POST
router.post('/users', verifyUser, adminOnly, createUser)

// READ - GET
router.get('/users', verifyUser, adminOnly, getUser)

// READ - GET by id
router.get('/users/:id', verifyUser, adminOnly, getUserById)

// UPDATE - PATCH
router.patch('/users/:id', verifyUser, adminOnly, updateUser)

// DELETE
router.delete('/users/:id', verifyUser, adminOnly, deleteUser)

export default router;



// import { getUsers, Register, Login, Logout } from "../controllers/UserController.js";
// import { verifyToken } from "../middleware/VerifyToken.js";
// import { refreshToken } from "../controllers/RefreshToken.js";

// const router = express.Router();

// router.get('/users', verifyToken, getUsers);
// router.post('/users', Register);
// router.post('/login', Login);
// router.get('/token', refreshToken);
// router.delete('/logout', Logout);

// export default router;