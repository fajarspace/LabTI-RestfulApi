import express from "express";
import { getJadwal, getJadwalById, createJadwal, updateJadwal, deleteJadwal } from "../controller/Jadwal.js";
import { verifyUser, adminOnly } from "../auth/authuser.js";

const router = express.Router()

// CREATE - POST
router.post('/jadwal', createJadwal)

// READ - GET with auth
// router.get('/jadwal', verifyUser, getJadwal)

// READ - GET without Auth
router.get('/jadwal', getJadwal)

// READ - GET by id
router.get('/jadwal/:id', verifyUser, getJadwalById)

// UPDATE - PATCH
router.patch('/jadwal/:id', verifyUser, updateJadwal)

// DELETE
router.delete('/jadwal/:id', verifyUser, deleteJadwal)

export default router;