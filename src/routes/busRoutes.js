import express from "express";

const busRouter = express.Router();

import { busCreate,busList,getBus } from "../controllers/busController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

busRouter.post("/busCreate", busCreate);
busRouter.get("/busList",verifyToken, busList);
busRouter.get("/getBus",verifyToken, getBus);


export default busRouter