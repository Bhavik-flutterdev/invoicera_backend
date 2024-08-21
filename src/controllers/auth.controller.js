import { User } from '../models/user.model.js';
import { ApiError } from '../utils/apiErors.js';
import { ApiResponse } from '../utils/apiResponse.js';

import { reistrationValidationSchema } from '../validators/user.validator.js';

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const loginWithEmail = async (req, res) => {


    try {
        const { fullName, email, password,confirmPassword, fcm,mpin} = req.body;

    const { error } = reistrationValidationSchema.validate(req.body);
    if (error) {
       return  res.status(400).json(
            {
                success: false,
                message: error.details[0].message,

            }
        )  ;
    }

    const user = await User.findOne({ email });
    if (user) {

        return  res.status(409).json(
            {
                success: false,
                message:"User with email already exists",
            }
        )  ;
    }


    const newUser = await User.create({
        name: fullName,
        mobile: "",
        email,
        fcm,
mpin
    });

    const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
       return res.status(500).json({
        "success": false,
        message:"Something went wrong while registering the user",
       }); 
    }
    const {accessToken} = await generateAccessAndRefereshTokens(createdUser._id)
    return res.status(201).json(
        new ApiResponse(200, {user:createdUser,accessToken}, "User registered Successfully")
    )
    } catch (error) {
        return res.status(500).json({
            "success": false,
            message:error,
           });  
    }
};

export { loginWithEmail }

