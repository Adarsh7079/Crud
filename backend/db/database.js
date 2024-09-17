import mongoose from "mongoose";
import {DB_NAME} from "../utils/constants.js"

const connectDb=async()=>{
   try{
    const connectDb=await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`\n MongoDb Connected !! DB HOST: ${connectDb.connection.host}`);
   }
   catch(error){
    console.log("MONGODB Connection error",error);
    process.exit(1)
   }
}
export default connectDb