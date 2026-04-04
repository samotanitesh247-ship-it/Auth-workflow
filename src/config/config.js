import dotenv from "dotenv";
dotenv.config();

if(!process.env.JWT_SECRET){
    console.error("JWT_SECRET is not defined in the environment variables");
    process.exit(1);
}
if(!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN || !process.env.GOOGLE_USER_ID) {
    console.error("Google OAuth credentials are not fully defined in the environment variables");
    process.exit(1);
}

const config = {
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER_ID: process.env.GOOGLE_USER_ID
}
export default config;