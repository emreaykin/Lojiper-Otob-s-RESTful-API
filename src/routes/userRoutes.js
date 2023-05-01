import express from "express";
import { verifyToken } from '../middlewares/authMiddleware.js';
const userRouter = express.Router();
import { registerUser, loginUser ,testData,userTickets} from "../controllers/userController.js";
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/test", testData);
userRouter.get("/userTickets",verifyToken, userTickets);


export default userRouter;
