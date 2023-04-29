import express from "express";
import { verifyToken } from '../middlewares/authMiddleware.js';
const userRouter = express.Router();
import { registerUser, loginUser ,test,testt} from "../controllers/userController.js";
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/test",verifyToken, test);
userRouter.get("/testt", testt);


export default userRouter;
