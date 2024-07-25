import express from "express";

import {
  getMessages,
  sendMessages,
} from "../controllers/messages.controllers.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
const router = express.Router();
router.post("/send/:id", protectRoute, sendMessages);
router.get("/:id", protectRoute, getMessages);
export default router;
