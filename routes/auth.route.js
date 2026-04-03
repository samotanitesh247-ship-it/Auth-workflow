import express from "express";
import { getMe, registerUser, login, refreshToken, logout, logoutAll} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.get("/getme", getMe);
authRouter.get("/login", login);
authRouter.get("/refresh-token" , refreshToken);
authRouter.get("/logout", logout);
authRouter.get("/logout-all", logoutAll);



export default authRouter;