import userModel from "../models/user.schema.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import cookieParser from "cookie-parser";
import sessionModel from "../models/session.model.js";
import { sendEmail } from "../services/email.service.js";
import otpModel from "../models/otp.model.js";
import { generateOtp, getOtpHtml } from "../utils/utils.js";

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

    const otp = generateOtp();
    const html = getOtpHtml(otp);

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    await otpModel.create({
        email,
        user: newUser._id,
        otpHash
    })


    res.status(201).json({message: "user registered successfully",
        newUser: {
            username: newUser.username,
            email: newUser.email,
            verified: newUser.verified

        } }
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
    if(!user.verified){
        return res.status(403).json({message: "user is not verified"});
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    if(hashedPassword != user.password){
        return res.status(401).json({message: "invalid credentials"});
    }

    const refreshToken = jwt.sign({
        id:user._id
    }, config.JWT_SECRET, {
        expiresIn : "7d"
    } 
    )

    const session = await sessionModel.create({
        user: user._id,
        refreshTokenHash: crypto.createHash("sha256").update(refreshToken).digest("hex"),
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })

    const accessToken = jwt.sign({
        id: user._id,
        sessionId: session._id
    }, config.JWT_SECRET, {
        expiresIn : "15m"
    } 
    )

    res.cookie("refreshToken", refreshToken, {
        httponly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7*24*60*60*1000
    })

    res.status(200).json({message: "user login successful",accessToken});
}

export const refreshToken = async (req,res) => {

    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({message: "refresh token is missing"});
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })

    if(!session){
        return res.status(401).json({message: "invalid refresh token"});
    }

    const accessToken = jwt.sign({
        id: decoded.id,
        sessionId: session._id
    }, config.JWT_SECRET,{
        expiresIn: "15m"
    })
    
    // for additional security we create a refresh token with the access token and send it to the client as a cookie

    const newRefreshToken = jwt.sign({
        id:decoded.id
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    })

    const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex");

    session.refreshTokenHash = newRefreshTokenHash;
    await session.save();

    res.cookie("refreshToken", newRefreshToken, {
        httponly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7*24*60*60*1000 //7 days in milliseconds
    })

    res.status(200).json({message: "access token refreshed successfully", accessToken});
}

export const logout = async (req,res) => {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({message: "refresh token is missing"});
    }

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })

    if(!session){
        return res.status(401).json({message: "invalid refresh token"});
    }

    session.revoked = true;
    await session.save();

    res.clearCookie("refreshToken");

    res.status(200).json({message: "user logged out successfully"});

}

export const logoutAll = async (req,res) => {

    const refreshToken = req.cookies.refreshToken;;

    if(!refreshToken){
        return res.status(401).json({message: "refresh token is missing"});
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

    await sessionModel.updateMany({
        user : decoded._id,
        revoked: false
    }, {
        revoked: true
    })

    res.clearCookie("refreshToken");

    res.status(200).json({message: "user logged out from all devices successfully"});


}

export const verifyEmail = async (req,res) => {
    const { email, otp } = req.query;

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    const otpRecord = await otpModel.findOne({email, otpHash});

    if(!otpRecord){
        return res.status(400).json({message: "invalid otp"});
    }

    const user = await userModel.findByIdAndUpdate(otpRecord.user, { emailVerified: true });
    await otpModel.deleteMany({email});

    res.status(200).json({message: "email verified successfully", user: {
        username: user.username,
        email: user.email,
        verified: user.verified
    }});
}





