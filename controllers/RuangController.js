const RuangModel = require("../models/RuangModel");
const UserModel = require("../models/UserModel");
const { Op } = require("sequelize");

exports.getRuang = async (req, res) => {
  try {
    const response = await RuangModel.findAll({
      attributes: ["uuid", "ruang"],
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

exports.getRuangById = async (req, res) => {
  try {
    const rg = await RuangModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!rg) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const response = await RuangModel.findOne({
      attributes: ["uuid", "ruang"],
      where: {
        id: rg.id,
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

exports.createRuang = async (req, res) => {
  const { ruang } = req.body;
  try {
    await RuangModel.create({
      ruang: ruang,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Ruang berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateRuang = async (req, res) => {
  try {
    const rg = await RuangModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!rg) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { ruang } = req.body;
    await RuangModel.update(
      {
        ruang,
      },
      {
        where: {
          id: rg.id,
        },
      }
    );
    res.status(200).json({ msg: "Update Ruang berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteRuang = async (req, res) => {
  try {
    const rg = await RuangModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!rg) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { ruang } = req.body;
    if (req.role === "admin") {
      await RuangModel.destroy({
        where: {
          id: rg.id,
        },
      });
    } else {
      if (req.userId !== rg.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await RuangModel.destroy({
        where: {
          [Op.and]: [{ id: rg.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Hapus rg berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
