import express from "express";
import { getUser, getUserById, createUser, updateUser, deleteUser } from "../controller/Users.js";
import { verifyUser, adminOnly } from "../auth/authuser.js";

const router = express.Router()

// CREATE - POST
router.post('/users', createUser)

// READ - GET
router.get('/users', verifyUser, adminOnly, getUser)

// READ - GET by id
router.get('/users/:id', verifyUser, adminOnly, getUserById)

// UPDATE - PATCH
router.patch('/users/:id', verifyUser, adminOnly, updateUser)

// DELETE
router.delete('/users/:id', verifyUser, adminOnly, deleteUser)

export default router;