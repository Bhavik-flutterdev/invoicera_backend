import   express from "express";
import cors from "cors";

const app = express();

app.use(cors(

    {origin:process.env.CORS_ORIGIN,}
));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true}));

import authRouter from "./routes/auth.route.js";


app.use("/api/v1/", authRouter)
export {app}