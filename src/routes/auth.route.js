import { Router } from 'express';
import { loginWithEmail } from '../controllers/auth.controller.js';
// import {verifyJWT} from "../middlewares/auth.middleware.js"

const authRouter = Router();

// router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

authRouter.route("/loginWithEmail").post(loginWithEmail);


export default authRouter