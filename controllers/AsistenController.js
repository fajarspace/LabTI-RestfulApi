const AsistenModel = require("../models/AsistenModel.js");
const UserModel = require("../models/UserModel.js");
const { Op } = require("sequelize");

exports.getAsisten = async (req, res) => {
  try {
    const response = await AsistenModel.findAll({
      attributes: ["uuid", "asisten"],
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

exports.getAsistenById = async (req, res) => {
  try {
    const astn = await AsistenModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!astn) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const response = await AsistenModel.findOne({
      attributes: ["uuid", "asisten"],
      where: {
        id: astn.id,
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

exports.createAsisten = async (req, res) => {
  const { asisten } = req.body;
  try {
    await AsistenModel.create({
      asisten: asisten,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Asisten berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateAsisten = async (req, res) => {
  try {
    const astn = await AsistenModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!astn) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { asisten } = req.body;
    await AsistenModel.update(
      {
        asisten,
      },
      {
        where: {
          id: astn.id,
        },
      }
    );
    res.status(200).json({ msg: "Update Asisten berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteAsisten = async (req, res) => {
  try {
    const astn = await AsistenModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!astn) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { asisten } = req.body;
    if (req.role === "admin") {
      await AsistenModel.destroy({
        where: {
          id: astn.id,
        },
      });
    } else {
      if (req.userId !== astn.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await AsistenModel.destroy({
        where: {
          [Op.and]: [{ id: astn.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Hapus astn berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
