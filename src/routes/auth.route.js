import { Router } from 'express';
import { sendOtp, verifyOtp} from '../controllers/auth.controller.js';
import {User} from "../models/user.model.js";
// import {verifyJWT} from "../middlewares/auth.middleware.js"

const authRouter = Router();

// router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

authRouter.route("/sendOtp").post(sendOtp);
authRouter.route("/verifyOtp").post(verifyOtp);


export default authRouter