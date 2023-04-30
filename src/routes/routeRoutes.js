import express  from "express";

const routeRoutes = express.Router();

import { createRoute,getRouteList ,getRouteDetail} from "../controllers/routeController.js";
routeRoutes.post("/createRoute",createRoute)
routeRoutes.get("/getRouteList",getRouteList)
routeRoutes.get("/getRouteDetail",getRouteDetail)

export default routeRoutes