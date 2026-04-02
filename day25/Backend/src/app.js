// server instance create karta hai
// server ko config karta
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import morgan from 'morgan'
import path from 'path'

const __dirname = path.resolve()
console.log(__dirname)

// *import Routes
import authRoutes from "./routes/auth.route.js";
import songRouters from "./routes/song.routes.js";

import cors from 'cors'
export const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

app.use(express.static('./public'))

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'))

///require routes
app.use("/api/auth", authRoutes);
app.use("/api/songs",songRouters)

// wild card
app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,'.','/public/index.html'))
})

