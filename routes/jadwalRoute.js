import express from "express";
import { getJadwal, getJadwalById, createJadwal, updateJadwal, deleteJadwal } from "../controllers/JadwalController.js";
import { verifyUser, adminOnly } from "../middleware/authUser.js";

const router = express.Router()

// CREATE - POST
router.post('/jadwal', verifyUser, createJadwal)

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

// import {
//     getJadwal, 
//     getJadwalById,
//     createJadwal,
//     updateJadwal,
//     deleteJadwal
// } from "../controllers/JadwalController.js";

// const router = express.Router();

// router.get('/jadwal', getJadwal);
// router.get('/jadwal/:id', getJadwalById);
// router.post('/jadwal', createJadwal);
// router.patch('/jadwal/:id', updateJadwal);
// router.delete('/jadwal/:id', deleteJadwal);

// export default router;