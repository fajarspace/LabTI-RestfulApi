import express from "express";
import { getUser, getUserById, createUser, updateUser, deleteUser } from "../controller/Users.js";

const router = express.Router()

// CREATE - POST
router.post('/users', createUser)

// READ - GET
router.get('/users', getUser)

// READ - GET by id
router.get('/users/:id', getUserById)

// UPDATE - PATCH
router.patch('/users/:id', updateUser)

// DELETE
router.delete('/users/:id', deleteUser)

export default router;