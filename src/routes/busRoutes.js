import express from "express";

const busRouter = express.Router();

import { busCreate,busList,getBusDetail } from "../controllers/busController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

busRouter.post("/busCreate",verifyToken, busCreate);
busRouter.get("/busList",verifyToken, busList);
busRouter.get("/getBusDetail",verifyToken, getBusDetail);


export default busRouter