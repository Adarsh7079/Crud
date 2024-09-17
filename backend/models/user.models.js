import mongoose from "mongoose";
import validator from "validator";

import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30, "name can not exid 30 char"],
        minLength:[4, "name shaould have more then 4 char "]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter valid e-mail"]
    }
    
})
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

export const User=mongoose.model("User",userSchema)