import {ErrorHandler} from "./ErrorHandler.js"
export const error=(err,req,res,next)=>{
    err.statusCode=err.statusCode ||500,
    err.message=err.message ||"Internal server error"

    //wrong mongodb error 
    if(err.name==="castError"){
        const message=`Resource not found . Invalid: ${err.path}`;
        err=new ErroHandler(message,400)
    }

    //mongoose error 
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} enter`;
        err=new ErroHandler(message,400)
    }

     //Wromg JWT error 
     if(err.code==='JsonWebTokenError'){
        const message=`Json Web Token is Invalid Try again`;
        err=new ErroHandler(message,400)
    }

    //JWT Expire error 
    if(err.code==='TokenExpireError'){
        const message=`Json Web Token is Expired, Try again`;
        err=new ErroHandler(message,400)
    }
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    });
};