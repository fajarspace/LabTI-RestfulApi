const JadwalModel = require("../models/JadwalModel.js");
const UserModel = require("../models/UserModel.js");
const { Op } = require("sequelize");

exports.getJadwal = async (req, res) => {
  try {
    const response = await JadwalModel.findAll({
      attributes: ['uuid', 'programStudi', 'kelas', 'hari', 'waktu', 'ruang', 'dosen', 'asisten1', 'asisten2', 'praktikum'],
      include: [{
        model: UserModel,
        attributes: ['nama', 'email']
      }]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

exports.searchJadwal = async (req, res) => {
  try {
    const { programStudi, praktikum } = req.query;

    const whereClause = {};
    if (programStudi) {
      whereClause.programStudi = { [Op.like]: `%${programStudi}%` };
    }
    if (praktikum) {
      whereClause.praktikum = { [Op.like]: `%${praktikum}%` };
    }

    const response = await JadwalModel.findAll({
      attributes: [
        'uuid',
        'programStudi',
        'kelas',
        'hari',
        'waktu',
        'ruang',
        'dosen',
        'asisten1',
        'asisten2',
        'praktikum',
      ],
      include: [
        {
          model: UserModel,
          attributes: ['nama', 'email'],
        },
      ],
      where: whereClause,
      order: [['programStudi', 'ASC'], ['kelas', 'ASC']],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }

}

exports.getJadwalById = async (req, res) => {
  try {
    const jadwal = await JadwalModel.findOne({
      where: {
        uuid: req.params.id
      }
    });
    if (!jadwal) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const response = await JadwalModel.findOne({
      attributes: ['uuid', 'programStudi', 'kelas', 'hari', 'waktu', 'ruang', 'dosen', 'asisten1', 'asisten2', 'praktikum'],
      where: {
        id: jadwal.id
      },
      include: [{
        model: UserModel,
        attributes: ['nama', 'email']
      }]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

exports.createJadwal = async (req, res) => {
  const { programStudi, kelas, hari, waktu, ruang, dosen, asisten1, asisten2, praktikum } = req.body;
  try {
    await JadwalModel.create({
      programStudi: programStudi,
      kelas: kelas,
      hari: hari,
      waktu: waktu,
      ruang: ruang,
      dosen: dosen,
      asisten1: asisten1,
      asisten2: asisten2,
      praktikum: praktikum,
      userId: req.userId
    });
    res.status(201).json({ msg: "Jadwal berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

exports.updateJadwal = async (req, res) => {
  try {
    const jadwal = await JadwalModel.findOne({
      where: {
        uuid: req.params.id
      }
    });
    if (!jadwal) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { programStudi, kelas, hari, waktu, ruang, dosen, asisten1, asisten2, praktikum } = req.body;
    await JadwalModel.update({ programStudi, kelas, hari, waktu, ruang, dosen, asisten1, asisten2, praktikum }, {
      where: {
        id: jadwal.id
      }
    });
    res.status(200).json({ msg: "Update Jadwal berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


exports.deleteJadwal = async (req, res) => {
  try {
    const jadwal = await JadwalModel.findOne({
      where: {
        uuid: req.params.id
      }
    });
    if (!jadwal) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { programStudi, kelas, hari, waktu, ruang, dosen, asisten1, asisten2, praktikum } = req.body;
    if (req.role === "admin") {
      await JadwalModel.destroy({
        where: {
          id: jadwal.id
        }
      });
    } else {
      if (req.userId !== jadwal.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await JadwalModel.destroy({
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
