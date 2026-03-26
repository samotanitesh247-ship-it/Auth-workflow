import userModel from "../models/user.schema.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const registerUser = async (req, res) => {

    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            { username},
            { email}
        ]
    })

    if(isAlreadyRegistered){
        res.status(409).json({message: "user already exists"});
        return;
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword
    })
    // now the server create a token and send it to the client for future authentication

    const token = jwt.sign({
        id: newUser._id
    }, config.JWT_SECRET, {
        expiresIn : "1d"
    } 
    )

    res.status(201).json({message: "user registered successfully",
        newUser: {
            username: newUser.username,
            email: newUser.email,

        }, token}
    );


}

export const getMe = async (req, res)=>{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "Token is missing"});
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    res.status(200).json({message: "user fetched successfully", user: {
        username: user.username,
        email: user.email
    }})
 }



