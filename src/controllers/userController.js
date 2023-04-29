import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import JsonWebToken from "jsonwebtoken";
export const registerUser = async (req, res) => {
  const { name, age, gender, mail, phone, password } = req.body;
  try {
    const exist = await userModel.findOne({
      mail: mail,
    });

    if (exist) {
      return res.status(200).json({ message: "Mail adresi kayıtlı" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name: name,
      age: age,
      gender: gender,
      mail: mail,
      phone: phone,
      password: hashedPassword,
      token: "",
      tickets: [],
    });
    return res
      .status(200)
      .json({ message: "Kullanıcı başarıyla kaydedildi.", user });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await userModel.findOne({
      mail: mail,
    });

    if (!user) {
      return res.status(500).json({ message: "Kullanıcı kayıtlı değil." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);
    if (passwordMatch) {
      const payload = { mail, password };
      const token = JsonWebToken.sign(payload, password, {
        expiresIn: 300,
      });
      user.token = token;
      await user.save();
      return  res.status(200).json({ message: "Giriş başarılı", token:token});

    }
    return res.status(500).json({ message: "Şifre Yanlış." });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error });
  }
};

export const test = async (req, res) => {
  return  res.status(200).json({ message: "test1"});
};
export const testt = async (req, res) => {
  return  res.status(200).json({ message: "test2"});
};