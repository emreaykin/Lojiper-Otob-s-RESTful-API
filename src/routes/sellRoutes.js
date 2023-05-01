import express  from "express";
import { sellTicket } from "../controllers/sellController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

const sellRoutes = express.Router();


sellRoutes.post("/sellTicket",verifyToken,sellTicket)


export default sellRoutes