import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app,server,io} from "./lib/socket.js"


dotenv.config();
// const app = express();

const PORT = process.env.PORT;
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
//cookie parser must be made before the router
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}
));
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


server.listen(PORT, () => {
    console.log("server is running on Port:" + PORT);
    connectDB();
})