import userModel from "../models/user.schema.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import cookieParser from "cookie-parser";

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

    const accessToken = jwt.sign({
        id: newUser._id
    }, config.JWT_SECRET, {
        expiresIn : "15m"
    } 
    )

    const refreshToken = jwt.sign({
        id: newUser._id
    }, config.JWT_SECRET, {
        expiresIn : "7d"
    } 
    )

    res.cookie("refreshToken", refreshToken, {
        httponly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7*24*60*60*1000
    })

    res.status(201).json({message: "user registered successfully",
        newUser: {
            username: newUser.username,
            email: newUser.email,

        }, accessToken, }
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
    }});
}

export const login = async (req,res) => {
    const {email,password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(404).json({message: "user not found"});
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    if(hashedPassword != user.password){
        return res.status(401).json({message: "invalid credentials"});
    }

    const token = jwt.sign({
        id: user._id
    }, config.JWT_SECRET, {
        expiresIn : "1d"
    } 
    )

    res.status(200).json({message: "user login successful", token});
}

export const refreshToken = async (req,res) => {

    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({message: "refresh token is missing"});
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

    const accessToken = jwt.sign({
        id: decoded.id
    }, config.JWT_SECRET,{
        expiresIn: "15m"
    })
    
    // for additional security we create a refresh token with the access token and send it to the client as a cookie

    const newRefreshToken = jwt.sign({
        id:decoded.id
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("refreshToken", newRefreshToken, {
        httponly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7*24*60*60*1000 //7 days in milliseconds
    })

    res.status(200).json({message: "access token refreshed successfully", accessToken});
}





