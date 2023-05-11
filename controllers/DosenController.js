import DosenModel from "../models/DosenModel.js";
import UserModel from "../models/UserModel.js";
import { Op } from "sequelize";

export const getDosen = async (req, res) => {
  try {
    const response = await DosenModel.findAll({
      attributes: ["uuid", "dosen"],
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

export const getDosenById = async (req, res) => {
  try {
    const dsn = await DosenModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!dsn) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const response = await DosenModel.findOne({
      attributes: ["uuid", "dosen"],
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

export const createDosen = async (req, res) => {
  const { dosen } = req.body;
  try {
    await DosenModel.create({
      dosen: dosen,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Dosen berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateDosen = async (req, res) => {
  try {
    const dsn = await DosenModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!dsn) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { dosen } = req.body;
    await DosenModel.update(
      {
        dosen,
      },
      {
        where: {
          id: dsn.id,
        },
      }
    );
    res.status(200).json({ msg: "Update Dosen berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteDosen = async (req, res) => {
  try {
    const dsn = await DosenModel.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!dsn) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { dosen } = req.body;
    if (req.role === "admin") {
      await DosenModel.destroy({
        where: {
          id: dsn.id,
        },
      });
    } else {
      if (req.userId !== dsn.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await DosenModel.destroy({
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
