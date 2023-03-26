import express from "express";
import { getJadwalTif, searchJadwalTI, getJadwalTifById, createJadwalTif, updateJadwalTif, deleteJadwalTif } from "../controllers/JadwalInformatikaController.js";
import { getJadwalTin, getJadwalTinById, createJadwalTin, updateJadwalTin, deleteJadwalTin } from "../controllers/JadwalIndustriController.js";
import { getJadwalTL, getJadwalTLById, createJadwalTL, updateJadwalTL, deleteJadwalTL } from "../controllers/JadwalLingkunganController.js";
import { verifyUser, adminOnly } from "../middleware/authUser.js";

const router = express.Router()

//TI
// CREATE - POST
router.post('/jadwal/tif', verifyUser, createJadwalTif)

// SORTIR / SEARCH
router.get('/jadwal', searchJadwalTI)

// READ - GET with auth
// router.get('/jadwal', verifyUser, getJadwalTif)

// READ - GET without Auth
router.get('/jadwal/tif', getJadwalTif)

// READ - GET by id
router.get('/jadwal/tif/:id', verifyUser, getJadwalTifById)

// UPDATE - PATCH
router.patch('/jadwal/tif/:id', verifyUser, updateJadwalTif)

// DELETE
router.delete('/jadwal/tif/:id', verifyUser, deleteJadwalTif)

//TIN
// CREATE - POST
router.post('/jadwal/tin', verifyUser, createJadwalTin)

// READ - GET with auth
// router.get('/jadwal', verifyUser, getJadwal)

// READ - GET without Auth
router.get('/jadwal/tin', getJadwalTin)

// READ - GET by id
router.get('/jadwal/tin/:id', verifyUser, getJadwalTinById)

// UPDATE - PATCH
router.patch('/jadwal/tin/:id', verifyUser, updateJadwalTin)

// DELETE
router.delete('/jadwal/tin/:id', verifyUser, deleteJadwalTin)

//TL
// CREATE - POST
router.post('/jadwal/tl', verifyUser, createJadwalTL)

// READ - GET with auth
// router.get('/jadwal', verifyUser, getJadwal)

// READ - GET without Auth
router.get('/jadwal/tl', getJadwalTL)

// READ - GET by id
router.get('/jadwal/tl/:id', verifyUser, getJadwalTLById)

// UPDATE - PATCH
router.patch('/jadwal/tl/:id', verifyUser, updateJadwalTL)

// DELETE
router.delete('/jadwal/tl/:id', verifyUser, deleteJadwalTL)

export default router;

// import {
//     getJadwal,
//     getJadwalTifById,
//     createJadwalTif,
//     updateJadwalTif,
//     deleteJadwalTif
// } from "../controllers/JadwalController.js";

// const router = express.Router();

// router.get('/jadwal', getJadwal);
// router.get('/jadwal/:id', getJadwalTifById);
// router.post('/jadwal', createJadwalTif);
// router.patch('/jadwal/:id', updateJadwalTif);
// router.delete('/jadwal/:id', deleteJadwalTif);

// export default router;