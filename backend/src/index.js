import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/auth",authRoutes);
app.unsubscribe(cookieParser());

app.listen(PORT, () => {
    console.log("server is running on Port:" + PORT);
    connectDB();
})