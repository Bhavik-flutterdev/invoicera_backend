import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        default: ""
    },
    phone: {
        type: String, default: ""
    },
    dob: {
        type: String, default: ""
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', ""],
        default: ""
    },
    profile_image: {type: String, default: ""},
    balance: String,
    fcm: {
        type: String, default: ""
    },

}, {timestamps: true});


// userSchema.pre("save", async function (next) {
//     if(!this.isModified("password")) return next();
//
//     this.password = await bcrypt.hash(this.password, 10)
//     next()
// })

// userSchema.methods.isPasswordCorrect = async function(password){
//     return await bcrypt.compare(password, this.password)
// }

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({_id: this._id,}, "9b76d043a5c9e7f1d3b5c2a1e4f6g8h9i0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",)
}

export const User = mongoose.model('User', userSchema);