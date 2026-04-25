import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "Username is taken"]
    },
     email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"]
    },
    password: { 
        type: String,
        required: true 

    }
   
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);

