const UserModel = require("../models/UserModel");
const argon2 = require("argon2");

exports.getUser = async (req, res) => {
  try {
    const response = await UserModel.findAll({
      attributes: ['uuid', 'nama', 'email', 'role'] // tampilkan yang perlu saja
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const response = await UserModel.findOne({
      attributes: ['uuid', 'nama', 'email', 'role'], // tampilkan yang perlu saja
      where: {
        uuid: req.params.id
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createUser = async (req, res) => {
  const { nama, email, password, konfirmPassword, role } = req.body;
  if (password !== konfirmPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await UserModel.create({
      nama: nama,
      email: email,
      password: hashPassword,
      role: role
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const user = await UserModel.findOne({
    where: {
      uuid: req.params.id
    }
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const { nama, email, password, konfirmPassword, role } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== konfirmPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  try {
    await UserModel.update(
      {
        nama: nama,
        email: email,
        password: hashPassword,
        role: role
      },
      {
        where: {
          id: user.id
        }
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const user = await UserModel.findOne({
    where: {
      uuid: req.params.id
    }
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await UserModel.destroy({
      where: {
        id: user.id
      }
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
