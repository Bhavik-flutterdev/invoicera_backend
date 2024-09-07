import mongoose from "mongoose";


const otpSchema = new mongoose.Schema({

    otp: {
        type: String,
    },
    phone:String
}, {timestamps: true});

export const Otp = mongoose.model('Otp', otpSchema);