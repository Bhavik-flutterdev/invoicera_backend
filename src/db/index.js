import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";



const connectDB = async()=>{
    try {
       const connectionResponse = await mongoose.connect(`${process.env.DB_URL}`);
       console.log(`\nDB ${DB_NAME} connected successfully`);
    } catch (error) {
        console.log(`\nERROR WHILE CONNECT DB ${error.messege}`);
        // process.exit(1);
    }
}



export default connectDB;