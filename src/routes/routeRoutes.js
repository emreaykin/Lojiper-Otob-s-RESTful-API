import express  from "express";

const routeRoutes = express.Router();

import { createRoute,getRouteList } from "../controllers/routeController.js";
routeRoutes.post("/createRoute",createRoute)
routeRoutes.get("/getRouteList",getRouteList)

export default routeRoutes