const JamModel = require("../models/JamModel");
const UserModel = require("../models/UserModel");
const { Op } = require("sequelize");

exports.getJam = async (req, res) => {
  try {
    const response = await JamModel.findAll({
      attributes: ["uuid", "jam"],
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

exports.getJamById = async (req, res) => {
  try {
    const jm = await JamModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!jm) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const response = await JamModel.findOne({
      attributes: ["uuid", "jam"],
      where: {
        id: jm.id,
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

exports.createJam = async (req, res) => {
  const { jam } = req.body;
  try {
    await JamModel.create({
      jam: jam,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Jam berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateJam = async (req, res) => {
  try {
    const jm = await JamModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!jm) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { jam } = req.body;
    await JamModel.update(
      {
        jam,
      },
      {
        where: {
          id: jm.id,
        },
      }
    );
    res.status(200).json({ msg: "Update Jam berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteJam = async (req, res) => {
  try {
    const jm = await JamModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!jm) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { jam } = req.body;
    if (req.role === "admin") {
      await JamModel.destroy({
        where: {
          id: jm.id,
        },
      });
    } else {
      if (req.userId !== jm.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await JamModel.destroy({
        where: {
          [Op.and]: [{ id: jm.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Hapus jm berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
