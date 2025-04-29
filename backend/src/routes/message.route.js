import express from "express";
import { protectRoute, getMessages, sendMessage } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", protectRoute , getUsersForSidebar)

router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute , sendMessage);

export default router;