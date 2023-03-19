import jadwalModel from "../model/jadwalModel.js";
import userModel from "../model/userModel.js";
import { Op } from "sequelize";

export const getJadwal = async (req, res) => {
  // try {
  //   let response;
  //   if (req.role === "admin") {
  //     response = await jadwalModel.findAll({
  //       attributes: ['uuid', 'dosen', 'asisten1', 'asisten2', 'hari', 'jam', 'kelas', 'praktikum'],
  //       include: [{
  //         model: userModel,
  //         attributes: ['nama', 'email']
  //       }]
  //     });
  //   } else {
  //     response = await jadwalModel.findAll({
  //       attributes: ['uuid', 'dosen', 'asisten1', 'asisten2', 'hari', 'jam', 'kelas', 'praktikum'],
  //       where: {
  //         userId: req.userId
  //       },
  //       include: [{
  //         model: userModel,
  //         attributes: ['nama', 'email']
  //       }]
  //     });
  //   }
  //   res.status(200).json(response);
  // } catch (error) {
  //   res.status(500).json({ msg: error.message });
  // }

  try {
    const response = await jadwalModel.findAll({
      attributes: ['uuid', 'dosen', 'asisten1', 'asisten2', 'hari', 'jam', 'kelas', 'praktikum'],
      include: [{
        model: userModel,
        attributes: ['nama', 'email']
      }]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const getJadwalById = async (req, res) => {
  try {
    const jadwal = await jadwalModel.findOne({
      where: {
        uuid: req.params.id
      }
    });
    if (!jadwal) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await jadwalModel.findOne({
        attributes: ['uuid', 'dosen', 'asisten1', 'asisten2', 'hari', 'jam', 'kelas', 'praktikum'],
        where: {
          id: jadwal.id
        },
        include: [{
          model: userModel,
          attributes: ['nama', 'email']
        }]
      });
    } else {
      response = await jadwalModel.findOne({
        attributes: ['uuid', 'dosen', 'asisten1', 'asisten2', 'hari', 'jam', 'kelas', 'praktikum'],
        where: {
          [Op.and]: [{ id: jadwalModel.id }, { userId: req.userId }]
        },
        include: [{
          model: userModel,
          attributes: ['nama', 'email']
        }]
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const createJadwal = async (req, res) => {
  const { dosen, asisten1, asisten2, hari, jam, kelas, praktikum } = req.body;
  try {
    await jadwalModel.create({
      dosen: dosen,
      asisten1: asisten1,
      asisten2: asisten2,
      hari: hari,
      jam: jam,
      kelas: kelas,
      praktikum: praktikum,
      userId: req.userId
    });
    res.status(201).json({ msg: "Jadwal berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const updateJadwal = async (req, res) => {
  try {
    const jadwal = await jadwalModel.findOne({
      where: {
        uuid: req.params.id
      }
    });
    if (!jadwal) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { dosen, asisten1, asisten2, hari, jam, kelas, praktikum } = req.body;
    if (req.role === "admin") {
      await jadwalModel.update({ dosen, asisten1, asisten2, hari, jam, kelas, praktikum }, {
        where: {
          id: jadwal.id
        }
      });
    } else {
      if (req.userId !== jadwal.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await jadwalModel.update({ dosen, asisten1, asisten2, hari, jam, kelas, praktikum }, {
        where: {
          [Op.and]: [{ id: jadwal.id }, { userId: req.userId }]
        }
      });
    }
    res.status(200).json({ msg: "Update Jadwal berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }

}

export const deleteJadwal = async (req, res) => {
  try {
    const jadwal = await jadwalModel.findOne({
      where: {
        uuid: req.params.id
      }
    });
    if (!jadwal) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { dosen, asisten1, asisten2, hari, jam, kelas, praktikum } = req.body;
    if (req.role === "admin") {
      await jadwalModel.destroy({
        where: {
          id: jadwal.id
        }
      });
    } else {
      if (req.userId !== jadwal.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await jadwalModel.destroy({
        where: {
          [Op.and]: [{ id: jadwal.id }, { userId: req.userId }]
        }
      });
    }
    res.status(200).json({ msg: "Hapus jadwal berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

