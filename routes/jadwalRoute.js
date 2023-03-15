import express from "express";
import { getJadwal, getJadwalById, createJadwal, updateJadwal, deleteJadwal } from "../controller/Jadwal.js";

const router = express.Router()

// CREATE - POST
router.post('/jadwal', createJadwal)

// READ - GET
router.get('/jadwal', getJadwal)

// READ - GET by id
router.get('/jadwal/:id', getJadwalById)

// UPDATE - PATCH
router.patch('/jadwal/:id', updateJadwal)

// DELETE
router.delete('/jadwal/:id', deleteJadwal)

export default router;