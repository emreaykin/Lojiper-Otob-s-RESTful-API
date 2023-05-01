import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import JsonWebToken from "jsonwebtoken";
import {testAddBus} from "../test/testAddBus.js"
import {testAddRoutes} from "../test/testAddRoutes.js"
import {testAddUser} from "../test/testAddUser.js"
export const registerUser = async (req, res) => {
  const { name, age, gender, mail, phone, password } = req.body;
  try {
    const exist = await userModel.findOne({
      mail: mail,
    });

    if (exist) {
      return res.status(400).json({ message: "Mail adresi kayıtlı" });
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

    return res.status(200).json({ message: "Kullanıcı başarıyla kaydedildi.", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await userModel.findOne({
      mail: mail,
    });

    if (!user) {
      return res.status(400).json({ message: "Kullanıcı kayıtlı değil." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const payload = { mail, password };
      const token = JsonWebToken.sign(payload, password, {
        expiresIn: "1h",
      });

      user.token = token;
      await user.save();

      return res.status(200).json({ message: "Giriş başarılı", token: token });
    }

    return res.status(400).json({ message: "Şifre Yanlış." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const userTickets = async (req, res) => {
  const decoded = req.user;
  const user = await userModel.findOne({ mail: decoded.mail });

  if (!user) {
    return res.status(404).json({ message: "Kullanıcı bulunamadı" });
  }

  return res.status(200).json({ message: "Kullanıcının biletleri: ", tickets: user.tickets });
};

export const testData = async (req, res) => {
 try {
  const addBus = await testAddBus();
  const addRoutes = await testAddRoutes();
  const addUser = await testAddUser();

  if(addBus && addRoutes && addUser){
    return res.status(200).json({ message: "Test verileri eklendi" });
  }
  return res.status(404).json({ message: "Hata oluştu" });
 } catch (error) {
  
 }
};


