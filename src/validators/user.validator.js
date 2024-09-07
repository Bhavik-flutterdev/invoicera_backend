import Joi from "joi";

const reistrationValidationSchema = Joi.object().keys({
    email: Joi.string().email().required().messages({'any.required': "Email is Required Field"}),
    password: Joi.string().min(8).required().messages({'any.required': "Password is Required Field"}),
    fcm: Joi.string().messages({'any.required': "FCM is Required Field"}),
});


const sendOtpValidationSchema = Joi.object().keys({
    phone: Joi.string().required().messages({
        'any.required': "Phone is Required Field",
        "string.base": "Phone must be a string",
        "string.empty": "phone can not be empty"
    }), country_code: Joi.string().min(3).required().messages({
        'any.required': "country_code is Required Field",
        "string.base": "country_code must be a string",
        "string.min": "country_code not allowed to be empty"
    }),
});
const verifyOtpVelidation = Joi.object().keys({
    otp: Joi.string().required().messages({
        'any.required': "otp is Required Field",
        "string.base": "otp must be a string",
        "string.empty": "otp can not be empty"
    }), device_id: Joi.string().required().messages({
        'any.required': "device_id is Required Field",
        "string.base": "device_id must be a string",
        "string.empty": "device_id can not be empty"
    }),

});

export {reistrationValidationSchema, sendOtpValidationSchema, verifyOtpVelidation};