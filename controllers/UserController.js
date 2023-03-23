import userModel from "../models/UserModel.js";
import argon2 from "argon2";

export const getUser = async (req, res) => {
  try {
    const response = await userModel.findAll({
      attributes: ['uuid', 'nama', 'email', 'role'] // tampilkan yang perlu saja
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
export const getUserById = async (req, res) => {
  try {
    const response = await userModel.findOne({
      attributes: ['uuid', 'nama', 'email', 'role'], // tampilkan yang perlu saja
      where: {
        uuid: req.params.id
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const createUser = async (req, res) => {
  const { nama, email, password, konfirmPassword, role } = req.body;
  if (password !== konfirmPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await userModel.create({
      nama: nama,
      email: email,
      password: hashPassword,
      role: role
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

export const updateUser = async (req, res) => {
  const user = await userModel.findOne({
    where: {
      uuid: req.params.id
    }
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const { nama, email, password, konfirmPassword, role } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== konfirmPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  try {
    await userModel.update({
      nama: nama,
      email: email,
      password: hashPassword,
      role: role
    }, {
      where: {
        id: user.id
      }
    });
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

export const deleteUser = async (req, res) => {
  const user = await userModel.findOne({
    where: {
      uuid: req.params.id
    }
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await userModel.destroy({
      where: {
        id: user.id
      }
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}