import JamModel from "../models/JamModel.js";
import UserModel from "../models/UserModel.js";
import { Op } from "sequelize";

export const getJam = async (req, res) => {
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

export const getJamById = async (req, res) => {
  try {
    const dsn = await JamModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!dsn) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const response = await JamModel.findOne({
      attributes: ["uuid", "jam"],
      where: {
        id: dsn.id,
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

export const createJam = async (req, res) => {
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

export const updateJam = async (req, res) => {
  try {
    const dsn = await JamModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!dsn) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { jam } = req.body;
    await JamModel.update(
      {
        jam,
      },
      {
        where: {
          id: dsn.id,
        },
      }
    );
    res.status(200).json({ msg: "Update Jam berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteJam = async (req, res) => {
  try {
    const dsn = await JamModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!dsn) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { jam } = req.body;
    if (req.role === "admin") {
      await JamModel.destroy({
        where: {
          id: dsn.id,
        },
      });
    } else {
      if (req.userId !== dsn.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await JamModel.destroy({
        where: {
          [Op.and]: [{ id: dsn.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Hapus dsn berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
