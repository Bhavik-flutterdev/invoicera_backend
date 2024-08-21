import dotenv from "dotenv"
import connectDB from "./db/index.js"

import{app} from "./app.js "

dotenv.config();

connectDB().then(() => {
    // app.onError((error) => {
    //     console.log(`Error: ${error}`);
    // });
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    })
}).catch((error) => {
    console.error('DB ERROR - ' + error.message)
});