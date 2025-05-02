import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app,server,io} from "./lib/socket.js"
import path from "path";

dotenv.config();
// const app = express();

const PORT = process.env.PORT;
const __dirname = path.resolve();
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

if(process.env.NODE_ENV==="production"){
    // Since React apps typically don’t have separate HTML files for each page, the backend serves only one page: index.html.
    // Visiting /profile doesn’t make a new request to the server.
    // React intercepts the request and renders the Profile component inside the existing index.html.
    // The browser requests /profile from the server, but Express doesn’t have a /profile endpoint.
    // Instead, Express serves index.html again, and React determines what to render based on the URL.
    
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
};

server.listen(PORT, () => {
    console.log("server is running on Port:" + PORT);
    connectDB();
})