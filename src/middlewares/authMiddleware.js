import JsonWebToken from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.headers["auth"];

  if (!token) {
    return res.status(401).json({ message: "Token bulunamadı" });
  }

  try {
    const decoded = JsonWebToken.decode(token);
    const verify = JsonWebToken.verify(token, decoded.password);
    if (verify) {
      console.log("Doğrulama başarılı");
      req.user = decoded;
      next();
    }
  } catch (error) {
    return res.status(500).json({ message: "Token doğrulanamadı.", error });
  }
};
