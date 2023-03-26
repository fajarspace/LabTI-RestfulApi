import JadwalInformatikaModel from "../models/JadwalInformatikaModel.js";
import UserModel from "../models/UserModel.js";
import { Op } from "sequelize";

export const getJadwalTif = async (req, res) => {
  // try {
  //   let response;
  //   if (req.role === "admin") {
  //     response = await JadwalInformatikaModel.findAll({
  //       attributes: ['uuid', 'dosen', 'asisten1', 'asisten2', 'hari', 'jam', 'kelas', 'praktikum'],
  //       include: [{
  //         model: UserModel,
  //         attributes: ['nama', 'email']
  //       }]
  //     });
  //   } else {
  //     response = await JadwalInformatikaModel.findAll({
  //       attributes: ['uuid', 'dosen', 'asisten1', 'asisten2', 'hari', 'jam', 'kelas', 'praktikum'],
  //       where: {
  //         userId: req.userId
  //       },
  //       include: [{
  //         model: UserModel,
  //         attributes: ['nama', 'email']
  //       }]
  //     });
  //   }
  //   res.status(200).json(response);
  // } catch (error) {
  //   res.status(500).json({ msg: error.message });
  // }

  try {
    const response = await JadwalInformatikaModel.findAll({
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

export const searchJadwalTI = async (req, res) => {
  try {
    const { programStudi, praktikum } = req.query;

    const whereClause = {};
    if (programStudi) {
      whereClause.programStudi = { [Op.like]: `%${programStudi}%` };
    }
    if (praktikum) {
      whereClause.praktikum = { [Op.like]: `%${praktikum}%` };
    }

    const response = await JadwalInformatikaModel.findAll({
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

export const getJadwalTifById = async (req, res) => {
  try {
    const jadwal = await JadwalInformatikaModel.findOne({
      where: {
        uuid: req.params.id
      }
    });
    if (!jadwal) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const response = await JadwalInformatikaModel.findOne({
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

export const createJadwalTif = async (req, res) => {
  const { programStudi, kelas, hari, waktu, ruang, dosen, asisten1, asisten2, praktikum } = req.body;
  try {
    await JadwalInformatikaModel.create({
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

export const updateJadwalTif = async (req, res) => {
  try {
    const jadwal = await JadwalInformatikaModel.findOne({
      where: {
        uuid: req.params.id
      }
    });
    if (!jadwal) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { programStudi, kelas, hari, waktu, ruang, dosen, asisten1, asisten2, praktikum } = req.body;
    await JadwalInformatikaModel.update({ programStudi, kelas, hari, waktu, ruang, dosen, asisten1, asisten2, praktikum }, {
      where: {
        id: jadwal.id
      }
    });
    res.status(200).json({ msg: "Update Jadwal berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const deleteJadwalTif = async (req, res) => {
  try {
    const jadwal = await JadwalInformatikaModel.findOne({
      where: {
        uuid: req.params.id
      }
    });
    if (!jadwal) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { programStudi, kelas, hari, waktu, ruang, dosen, asisten1, asisten2, praktikum } = req.body;
    if (req.role === "admin") {
      await JadwalInformatikaModel.destroy({
        where: {
          id: jadwal.id
        }
      });
    } else {
      if (req.userId !== jadwal.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await JadwalInformatikaModel.destroy({
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




// export const getJadwal = async(req, res) =>{
//     try {
//         const response = await Jadwal.findAll();
//         res.status(200).json(response);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// export const getJadwalById = async(req, res) =>{
//     try {
//         const response = await Jadwal.findOne({
//             where:{
//                 id: req.params.id
//             }
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// export const createJadwal = async(req, res) =>{
//     try {
//         await Jadwal.create(req.body);
//         res.status(201).json({msg: "Jadwal Created"});
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// export const updateJadwal = async(req, res) =>{
//     try {
//         await Jadwal.update(req.body,{
//             where:{
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({msg: "Jadwal Updated"});
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// export const deleteJadwal = async(req, res) =>{
//     try {
//         await Jadwal.destroy({
//             where:{
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({msg: "Jadwal Deleted"});
//     } catch (error) {
//         console.log(error.message);
//     }
// }