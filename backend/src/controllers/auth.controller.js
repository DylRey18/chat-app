import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const {fullName,email,password} = req.body
    try {
        //hashing password with bcryptjs

        //checking user password
        if (password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters"});
        }
        
        //check if user with the email exists
        const user = await User.findOne({email});

        if(user) {
            return res.status(400).json({ message: "Email already exists"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);
        
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        })

    } catch (error) {
        
    }
}

export const login = (req, res) => {
    res.send("login route");
}

export const logout = (req, res) => {
    res.send("logout route");
}