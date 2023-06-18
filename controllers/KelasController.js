const KelasModel = require("../models/KelasModel");
const UserModel = require("../models/UserModel");
const { Op } = require("sequelize");

exports.getKelas = async (req, res) => {
  try {
    const response = await KelasModel.findAll({
      attributes: ["uuid", "kelas"],
      include: [
        {
          model: UserModel,
          attributes: ["nama", "email"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getKelasById = async (req, res) => {
  try {
    const kls = await KelasModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kls) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const response = await KelasModel.findOne({
      attributes: ["uuid", "kelas"],
      where: {
        id: kls.id,
      },
      include: [
        {
          model: UserModel,
          attributes: ["nama", "email"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createKelas = async (req, res) => {
  const { kelas } = req.body;
  try {
    await KelasModel.create({
      kelas: kelas,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Kelas berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateKelas = async (req, res) => {
  try {
    const kls = await KelasModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kls) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { kelas } = req.body;
    await KelasModel.update(
      {
        kelas,
      },
      {
        where: {
          id: kls.id,
        },
      }
    );
    res.status(200).json({ msg: "Update Kelas berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteKelas = async (req, res) => {
  try {
    const kls = await KelasModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kls) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { kelas } = req.body;
    if (req.role === "admin") {
      await KelasModel.destroy({
        where: {
          id: kls.id,
        },
      });
    } else {
      if (req.userId !== kls.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await KelasModel.destroy({
        where: {
          [Op.and]: [{ id: kls.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Hapus kls berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
