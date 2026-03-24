import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());             //this is for middleware to parse incoming JSON data in the request body
app.use(morgan("dev"));


export default app;
