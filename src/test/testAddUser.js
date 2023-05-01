import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const testAddUser = async () => {
  try {
    await userModel.deleteMany();
    const password = "135791";
    const hashedPassword = await  bcrypt.hash(password, 10);
    await userModel.create({
      name: "lojiper",
      age: "25",
      gender: "Erkek",
      mail: "mail@lojiper.com",
      phone: "5059867458",
      password: hashedPassword,
      token: "",
      tickets: [],
    });

    return true;
  } catch (error) {
    return false;
  }
};
