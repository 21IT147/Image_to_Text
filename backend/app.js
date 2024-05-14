import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import cors from "cors";
import EventEmitter from 'events';
dotenv.config();
const app = express();
EventEmitter.defaultMaxListeners = 100; 
app.use(cors());
app.use(express.json());

connectDB(process.env.DB);


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})


import userRoute from "../backend/routes/userauth.route.js";
app.use("/api/v1/user",userRoute);

import imageRoute from "./routes/image.route.js";
app.use("/api/v1/image",imageRoute);
