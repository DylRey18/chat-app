import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
//cookie parser must be made before the router
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);


app.listen(PORT, () => {
    console.log("server is running on Port:" + PORT);
    connectDB();
})