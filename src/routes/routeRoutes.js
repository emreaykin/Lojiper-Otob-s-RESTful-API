import express  from "express";

const routeRoutes = express.Router();

import { createRoute,getRouteList ,getRouteDetail} from "../controllers/routeController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
routeRoutes.post("/createRoute",verifyToken,createRoute)
routeRoutes.get("/getRouteList",verifyToken,getRouteList)
routeRoutes.get("/getRouteDetail",verifyToken,getRouteDetail)

export default routeRoutes