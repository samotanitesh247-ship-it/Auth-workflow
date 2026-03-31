import express from "express";
import { getMe, registerUser, login, refreshToken} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.get("/getme", getMe);
authRouter.get("/login", login);
authRouter.get("/refresh-token" , refreshToken);


export default authRouter;