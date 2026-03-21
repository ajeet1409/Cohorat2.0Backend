// server instance create karta hai
// server ko config karta
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route.js";
import cors from 'cors'
export const app = express();

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials:true
// }))

app.use(express.json());
app.use(cookieParser());
///require routes
app.use("/api/auth", authRoute);

