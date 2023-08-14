const JadwalModel = require("../models/JadwalModel.js");
const UserModel = require("../models/UserModel.js");
const { Sequelize, Op } = require("sequelize");
const db = require("../config/Database.js");

exports.getJadwal = async (req, res) => {
  try {
    const results = await db.query("CALL GetJadwal()", {
      type: Sequelize.QueryTypes.RAW,
      mapToModel: true,
      model: JadwalModel,
      include: [
        {
          model: UserModel,
          attributes: ["nama", "email"],
        },
      ],
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getJadwalById = async (req, res) => {
  try {
    const jadwalId = req.params.id;

    const jadwal = await db.query("CALL GetJadwalById(:jadwalId)", {
      type: Sequelize.QueryTypes.RAW,
      mapToModel: true,
      model: JadwalModel,
      replacements: { jadwalId }, // Replace the parameter in the query
    });

    if (!jadwal[0]) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    res.status(200).json(jadwal[0]);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createJadwal = async (req, res) => {
  const {
    programStudi,
    kelas,
    hari,
    waktu,
    ruang,
    dosen,
    asisten1,
    asisten2,
    praktikum,
  } = req.body;

  try {
    await db.query(
      "CALL CreateJadwal(:programStudi, :kelas, :hari, :waktu, :ruang, :dosen, :asisten1, :asisten2, :praktikum, :userId)",
      {
        type: Sequelize.QueryTypes.RAW,
        replacements: {
          programStudi,
          kelas,
          hari,
          waktu,
          ruang,
          dosen,
          asisten1,
          asisten2,
          praktikum,
          userId: req.userId,
        },
      }
    );

    res.status(201).json({ msg: "Jadwal berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateJadwal = async (req, res) => {
  const jadwalId = req.params.id;
  const {
    programStudi,
    kelas,
    hari,
    waktu,
    ruang,
    dosen,
    asisten1,
    asisten2,
    praktikum,
  } = req.body;

  try {
    await db.query(
      "CALL UpdateJadwal(:jadwalId, :programStudi, :kelas, :hari, :waktu, :ruang, :dosen, :asisten1, :asisten2, :praktikum)",
      {
        type: Sequelize.QueryTypes.RAW,
        replacements: {
          jadwalId,
          programStudi,
          kelas,
          hari,
          waktu,
          ruang,
          dosen,
          asisten1,
          asisten2,
          praktikum,
        },
      }
    );

    res.status(200).json({ msg: "Update Jadwal berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteJadwal = async (req, res) => {
  const jadwalId = req.params.id;
  const userId = req.userId;
  const userRole = req.role;

  try {
    const jadwalUserId = await JadwalModel.findOne({
      where: { uuid: jadwalId },
      attributes: ["userId"],
    });

    if (!jadwalUserId) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    if (userRole === "admin" || userId === jadwalUserId) {
      await db.query("CALL DeleteJadwal(:jadwalId, :userId, :userRole)", {
        type: Sequelize.QueryTypes.RAW,
        replacements: {
          jadwalId,
          userId,
          userRole,
        },
      });

      res.status(200).json({ msg: "Hapus jadwal berhasil!" });
    } else {
      res.status(403).json({ msg: "Akses terlarang" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.searchJadwal = async (req, res) => {
  try {
    const { programStudi, kelas, dosen } = req.query;

    // Modify dosenParam to allow partial matching
    const dosenParamForQuery = dosen ? `%${dosen}%` : null;

    const results = await db.query(
      "CALL SearchJadwal(:programStudi, :kelas, :dosen)",
      {
        replacements: {
          programStudi: programStudi || null,
          kelas: kelas || null,
          dosen: dosenParamForQuery, // Use the modified dosen parameter
        },
        type: Sequelize.QueryTypes.RAW,
        mapToModel: true,
        model: JadwalModel,
      }
    );

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.searchDosen = async (req, res) => {
  try {
    const { dosenName } = req.query;

    const dosenParamForQuery = dosenName ? `%${dosenName}%` : null;

    const results = await db.query("CALL SearchDosen(:dosenName)", {
      replacements: {
        dosenName: dosenParamForQuery,
      },
      type: Sequelize.QueryTypes.RAW,
      mapToModel: true,
      model: JadwalModel, // Use the JadwalModel to map the results
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
