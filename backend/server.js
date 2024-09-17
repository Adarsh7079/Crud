import {app} from "./app.js"
import dotenv from "dotenv"
import connectDb from "./db/database.js"


dotenv.config({path:"./.env"})
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`Server is running : ${process.env.PORT}`);
  
})
connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is working on port : ${process.env.PORT} `)
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed!!!",err);
})
