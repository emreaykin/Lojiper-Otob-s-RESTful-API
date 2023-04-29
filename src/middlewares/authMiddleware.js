import JsonWebToken from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const verifyToken = async (req, res, next) => {
  const token = req.headers["auth"];

  if (!token) {
    return res.status(401).json({ message: "Token bulunamadı" });
  }

  try {
    const decoded = JsonWebToken.decode(token);
    const user = await userModel.findOne({ mail: decoded.mail });

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const verify = JsonWebToken.verify(token, decoded.password);
    console.log(verify);
    if (verify) {
      console.log("doğrulama başarılı");
      next();
    }
    
  
  } catch (error) {
    return res.status(500).json({ message: "Token doğrulanamadı.", error });
  }
};
