import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async (MONGO_URI) => {

    await mongoose.connect(config.MONGO_URI);

    console.log("Connected to DB");
}

export default connectDB;