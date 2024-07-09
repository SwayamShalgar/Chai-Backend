import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from 'dotenv'
dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`SERVER IS LISTNING ON PORT : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO CONNECTION FAILED : ", err);
})

/*
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("Error", (error) => {
            console.log("Error", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on ${process.env.PORT}`);
        })
    } catch(error) {
        console.error("ERROR : ", error);
        throw error
    }
})
*/