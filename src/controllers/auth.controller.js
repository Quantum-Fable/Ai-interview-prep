
import { User } from '../models/userSchema.js';
import bcrypt from 'bcryptjs';    
import jwt from 'jsonwebtoken';

export const signupController = async (req, res) => {
    const {username, email,password} = req.body;

    try {
        const exsisttingUser = await User.findOne({email})
        if(exsisttingUser) 
            return res.status(400).json({message: "user already exists"})
    } catch (error) {
        res.status(500).json({message: "Error occurred while signing up"});
    }

     if(!username || !email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }
    
    const hassedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        email,
        password: hassedPassword
    }); 

    try {
        await newUser.save();
        res.status(201).json({message: "User created successfully"});
    } catch (error) {
        res.status(500).json({message: "Error occurred while creating user"});
    }

    const token = jwt.sign(
        {id: newUser._id, username: newUser.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    
    )

    res.cookie("token", token)

    res.status(201).json({messasge: "User created successfully", 
        token,
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
    })
}
