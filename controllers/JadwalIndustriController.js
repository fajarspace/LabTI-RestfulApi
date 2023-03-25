import JadwalIndustriModel from "../models/JadwalIndustriModel.js";
import UserModel from "../models/UserModel.js";
import { Op } from "sequelize";

export const getJadwalTin = async (req, res) => {
  // try {
  //   let response;
  //   if (req.role === "admin") {
  //     response = await JadwalIndustriModel.findAll({
  //       attributes: ['uuid', 'dosen', 'asisten1', 'asisten2', 'hari', 'jam', 'kelas', 'praktikum'],
  //       include: [{
  //         model: UserModel,
  //         attributes: ['nama', 'email']
  //       }]
  //     });
  //   } else {
  //     response = await JadwalIndustriModel.findAll({
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
    const response = await JadwalIndustriModel.findAll({
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

export const getJadwalTinById = async (req, res) => {
  try {
    const jadwal = await JadwalIndustriModel.findOne({
      where: {
        uuid: req.params.id
      }
    });
    if (!jadwal) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const response = await JadwalIndustriModel.findOne({
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

export const createJadwalTin = async (req, res) => {
  const { programStudi, kelas, hari, waktu, ruang, dosen, asisten1, asisten2, praktikum } = req.body;
  try {
    await JadwalIndustriModel.create({
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

export const updateJadwalTin = async (req, res) => {
  try {
    const jadwal = await JadwalIndustriModel.findOne({
      where: {
        uuid: req.params.id
      }
    });
    if (!jadwal) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { programStudi, kelas, hari, waktu, ruang, dosen, asisten1, asisten2, praktikum } = req.body;
    await JadwalIndustriModel.update({ programStudi, kelas, hari, waktu, ruang, dosen, asisten1, asisten2, praktikum }, {
      where: {
        id: jadwal.id
      }
    });
    res.status(200).json({ msg: "Update Jadwal berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const deleteJadwalTin = async (req, res) => {
  try {
    const jadwal = await JadwalIndustriModel.findOne({
      where: {
        uuid: req.params.id
      }
    });
    if (!jadwal) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { programStudi, kelas, hari, waktu, ruang, dosen, asisten1, asisten2, praktikum } = req.body;
    if (req.role === "admin") {
      await JadwalIndustriModel.destroy({
        where: {
          id: jadwal.id
        }
      });
    } else {
      if (req.userId !== jadwal.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await JadwalIndustriModel.destroy({
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




// export const getJadwalTin = async(req, res) =>{
//     try {
//         const response = await Jadwal.findAll();
//         res.status(200).json(response);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// export const getJadwalTinById = async(req, res) =>{
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

// export const createJadwalTin = async(req, res) =>{
//     try {
//         await Jadwal.create(req.body);
//         res.status(201).json({msg: "Jadwal Created"});
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// export const updateJadwalTin = async(req, res) =>{
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

// export const deleteJadwalTin = async(req, res) =>{
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