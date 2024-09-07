import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: false,
    },
    mobile: {
        type: String,
        required: false,
        unique: false,
    },
    dob: {
        type: String, required: false,

    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    profile_image: {type: String},
    balance: String,
    fcm: {
        type: String,
        required: false,

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

}
userSchema.methods.generateRefreshToken = function () {
}


export const User = mongoose.model('User', userSchema);