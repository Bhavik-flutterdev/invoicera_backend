import Joi from "joi";

const reistrationValidationSchema = Joi.object().keys({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  fcm: Joi.string(),
  mpin:Joi.string().min(4).required()
});

export {reistrationValidationSchema};