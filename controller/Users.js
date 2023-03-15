import userModel from "../models/userModel.js";
import argon2 from "argon2";

export const getUser = async (req, res) => {
  try {
    const response = await userModel.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
export const getUserById = async (req, res) => {
  try {
    const response = await userModel.findOne({
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

export const updateUser = (req, res) => {

}

export const deleteUser = (req, res) => {

}
