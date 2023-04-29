import express from "express";

const userRouter = express.Router();
import { registerUser, loginUser } from "../controllers/userController.js";
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

export default userRouter;
