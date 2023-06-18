const express = require("express");
const {
  getJadwal,
  searchJadwal,
  getJadwalById,
  createJadwal,
  updateJadwal,
  deleteJadwal,
} = require("../controllers/JadwalController.js");
const {
  getAsisten,
  getAsistenById,
  createAsisten,
  updateAsisten,
  deleteAsisten,
} = require("../controllers/AsistenController.js");
const {
  getDosen,
  getDosenById,
  createDosen,
  updateDosen,
  deleteDosen,
} = require("../controllers/DosenController.js");
const {
  getJam,
  getJamById,
  createJam,
  updateJam,
  deleteJam,
} = require("../controllers/JamController.js");
const {
  getKelas,
  getKelasById,
  createKelas,
  updateKelas,
  deleteKelas,
} = require("../controllers/KelasController.js");
const { verifyUser, adminOnly } = require("../middleware/authUser.js");

const router = express.Router();

router.post("/jadwal", verifyUser, createJadwal);
router.get("/jadwal", searchJadwal);
router.get("/jadwal", getJadwal);
router.get("/jadwal/:id", verifyUser, getJadwalById);
router.patch("/jadwal/:id", verifyUser, updateJadwal);
router.delete("/jadwal/:id", verifyUser, deleteJadwal);

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

module.exports = router;
