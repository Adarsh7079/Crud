import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ErrorHandler} from "../utils/ErrorHandler.js";
import {sendToken} from "../utils/sendToken.js"

export const register = asyncHandler(async (req, res, next) => {
    try {

        const { name, email} = req.body;
        const userExist = await User.findOne({ email });
        
        if (userExist) {
            return next(new ErrorHandler('User already exists', 404));
        }

        const user = await User.create({
            name,
            email,
        });
        console.log("User new created: ",user);
        sendToken(user,200,res);
    } catch (error) {
        console.error('Registration Error:', error);
        return next(new ErrorHandler('Registration failed', 500));
    }
});




//get user detils 
export const getall=asyncHandler(async(req,res,next)=>{
    const user=await User.find();
    res.status(200).json({
        success:true,
        user
    });
});


//Update user Profile
export const updateUserProfile=asyncHandler(async(req,res,next)=>{
  
    // const newUserData={
    //     name:req.body.name,
    //     email:req.body.email,
    // }
    // //we will add cloudinary letter 
    // const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
    //     new:true,
    //     runValidators:true,
    //     useFindAndModify:false
    // });

    // res.status(200).json({
    //     success:true,
    //     user

    // })

    
  
    const user=await User.findById(req.params.id)
        if(!user)
        {
            return next(new ErrorHandler("user not exist",400))
        }
    
    
        user.name=req.body.name;
        await user.save();
    
        sendToken(user,200,res);
    
});

//get all user(Admin)
export const getAllUsers=asyncHandler(async(req,res,next)=>{
    const users=await User.find();

    res.status(200).json({
        success:true,
        users
    })
})


//delete user Role(admin)
export const deleteUser=asyncHandler(async(req,res,next)=>{

    const user=await User.findById(req.params.id)
   
    if(!user){
        return next(new ErrorHandler(`user does not exist with id ${req.params.id}`))
    }
    await user.deleteOne(user._id);
    // we will remove cloudinary 
    res.status(200).json({
        success:true,
        message:"user deleted"
    })
    
});