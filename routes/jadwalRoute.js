import express from "express";
import {
  getJadwalTif,
  searchJadwalTI,
  getJadwalTifById,
  createJadwalTif,
  updateJadwalTif,
  deleteJadwalTif,
} from "../controllers/JadwalController.js";
import {
  getAsisten,
  getAsistenById,
  createAsisten,
  updateAsisten,
  deleteAsisten,
} from "../controllers/AsistenController.js";
import {
  getDosen,
  getDosenById,
  createDosen,
  updateDosen,
  deleteDosen,
} from "../controllers/DosenController.js";
import {
  getJam,
  getJamById,
  createJam,
  updateJam,
  deleteJam,
} from "../controllers/JamController.js";
import {
  getKelas,
  getKelasById,
  createKelas,
  updateKelas,
  deleteKelas,
} from "../controllers/KelasController.js";
import { verifyUser, adminOnly } from "../middleware/authUser.js";

const router = express.Router();

router.post("/jadwal", verifyUser, createJadwalTif);
router.get("/jadwal", searchJadwalTI);
router.get("/jadwal", getJadwalTif);
router.get("/jadwal/:id", verifyUser, getJadwalTifById);
router.patch("/jadwal/:id", verifyUser, updateJadwalTif);
router.delete("/jadwal/:id", verifyUser, deleteJadwalTif);

router.post("/kelas", verifyUser, createKelas);
router.get("/kelas", getKelas);
router.get("/kelas/:id", verifyUser, getKelasById);
router.patch("/kelas/:id", verifyUser, updateKelas);
router.delete("/kelas/:id", verifyUser, deleteKelas);

router.post("/dosen", verifyUser, createDosen);
router.get("/dosen", getDosen);
router.get("/dosen/:id", verifyUser, getDosenById);
router.patch("/dosen/:id", verifyUser, updateDosen);
router.delete("/dosen/:id", verifyUser, deleteDosen);

router.post("/asisten", verifyUser, createAsisten);
router.get("/asisten", getAsisten);
router.get("/asisten/:id", verifyUser, getAsistenById);
router.patch("/asisten/:id", verifyUser, updateAsisten);
router.delete("/asisten/:id", verifyUser, deleteAsisten);

router.post("/jam", verifyUser, createJam);
router.get("/jam", getJam);
router.get("/jam/:id", verifyUser, getJamById);
router.patch("/jam/:id", verifyUser, updateJam);
router.delete("/jam/:id", verifyUser, deleteJam);

export default router;
