import express from "express";
import { getMe, registerUser, login} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.get("/getme", getMe);
authRouter.get("/login", login);


export default authRouter;