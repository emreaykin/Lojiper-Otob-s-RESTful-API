import express from "express";

const busRouter = express.Router();

import { busCreate,busList,getBus } from "../controllers/busController.js";

busRouter.post("/busCreate", busCreate);
busRouter.get("/busList", busList);
busRouter.get("/getBus", getBus);


export default busRouter