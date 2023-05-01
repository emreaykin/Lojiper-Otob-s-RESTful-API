import express  from "express";
import { sellTicket } from "../controllers/sellController.js";

const sellRoutes = express.Router();


sellRoutes.post("/sellTicket",sellTicket)


export default sellRoutes