export const sendToken=(user,statusCode,res)=>{
    const token=user.getJWTToken();

    const options={
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
       
    }
   // console.log("user i got ",user)
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        user,
        token
    })
}
