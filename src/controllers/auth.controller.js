import {User} from '../models/user.model.js';
import {ApiError} from '../utils/apiErors.js';
import {ApiResponse} from '../utils/apiResponse.js';

import {
    reistrationValidationSchema,
    sendOtpValidationSchema,
    verifyOtpVelidation
} from '../validators/user.validator.js';
import {Otp} from "../models/otp.model.js";

function isUnder5Minutes(timestamp) {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    return timestamp > fiveMinutesAgo;
}

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}



const sendOtp = async (req, res) => {


    try {
        const {phone, county_code} = req.body;

        const {error} = sendOtpValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json(
                {
                    success: false,
                    message: error.details[0].message,
                }
            );
        }
        const otpString = `${Math.floor(100000 + Math.random() * 900000)}`;
        const otp = await Otp.create({otp: "1234", phone});
        return res.status(200).json(new ApiResponse(200, {
            device_id: otp._id
        }, "Otp Send Successfully"))
    } catch (e) {
        return res.status(500).json(new ApiError(500, "Serwor error", e))
    }

}

const verifyOtp = async (req, res) => {
    try {

        const {otp, device_id} = req.body;
        const {error} = verifyOtpVelidation.validate(req.body);

        if (error) {
            return res.status(400).json(
                new ApiResponse(400, error.details)
            );
        }

        const otpDetails = await  Otp.findOne({_id: device_id, otp: otp})

        if (otpDetails) {
            const userDetails =await User.findOne({phone: otpDetails.phone})
            let isNew = true;
            if (!isUnder5Minutes(otpDetails.createdAt)) {
                return res.status(401).json(new ApiResponse(401, {},"Otp is Expired"))
            }
            if (userDetails) {
                isNew = false;
            }
            return res.status(200).json(new ApiResponse(200, {isNew, user: userDetails}, "Otp Verify Successfully",
            ))
        } else {
            return res.status(401).json(new ApiError(401, "Otp Verification Failed"))
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json(new ApiError(500, "Serwor error", e))
    }
}


export { sendOtp, verifyOtp}

