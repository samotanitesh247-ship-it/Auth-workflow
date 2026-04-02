import express from "express";
import { getMe, registerUser, login, refreshToken, logout} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.get("/getme", getMe);
authRouter.get("/login", login);
authRouter.get("/refresh-token" , refreshToken);
authRouter.get("/logout", logout);


export default authRouter;