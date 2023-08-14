const PraktikumModel = require("../models/PraktikumModel");
const UserModel = require("../models/UserModel");
const { Op } = require("sequelize");

exports.getPraktikum = async (req, res) => {
  try {
    const response = await PraktikumModel.findAll({
      attributes: ["uuid", "praktikum"],
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

exports.getPraktikumById = async (req, res) => {
  try {
    const pr = await PraktikumModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pr) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const response = await PraktikumModel.findOne({
      attributes: ["uuid", "praktikum"],
      where: {
        id: pr.id,
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

exports.createPraktikum = async (req, res) => {
  const { praktikum } = req.body;
  try {
    await PraktikumModel.create({
      praktikum: praktikum,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Praktikum berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updatePraktikum = async (req, res) => {
  try {
    const pr = await PraktikumModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pr) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { praktikum } = req.body;
    await PraktikumModel.update(
      {
        praktikum,
      },
      {
        where: {
          id: pr.id,
        },
      }
    );
    res.status(200).json({ msg: "Update Praktikum berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deletePraktikum = async (req, res) => {
  try {
    const pr = await PraktikumModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pr) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { praktikum } = req.body;
    if (req.role === "admin") {
      await PraktikumModel.destroy({
        where: {
          id: pr.id,
        },
      });
    } else {
      if (req.userId !== pr.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await PraktikumModel.destroy({
        where: {
          [Op.and]: [{ id: pr.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Hapus pr berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
