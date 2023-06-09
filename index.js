import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./src/routes/userRoutes.js";
import busRouter from "./src/routes/busRoutes.js";
import routeRoutes from "./src/routes/routeRoutes.js";
import sellRoutes from "./src/routes/sellRoutes.js";

dotenv.config();
const { PORT, MONGO_URI } = process.env;
const app = express();

app.use(bodyParser.json({ limit: "2mb" }));
app.use(express.json());
app.use(cors());

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Veritabanı bağlandı");
    const server = app.listen(PORT, () => {
      console.log(`Uygulama http://localhost:${PORT} çalışıyor `);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", userRouter);
app.use("/", busRouter);
app.use("/",routeRoutes)
app.use("/",sellRoutes)





