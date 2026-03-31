import express from "express";
import morgan from "morgan";
import authRouter from "../routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());             //this is for middleware to parse incoming JSON data in the request body
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRouter);

export default app;
