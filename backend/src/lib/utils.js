import jwt from "jsonwebtoken";

export const generateToken = (userId, res) =>{
    //make the token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, 
        {expiresIn:"7d"});
    
    //user cookie to be send to user
    res.cookie("jwt",token, {
        maxAge: 7*24*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })

    return token;
}