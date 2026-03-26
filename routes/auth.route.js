import express from "express";
import { getMe, registerUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.get("/getme", getMe);


export default authRouter;