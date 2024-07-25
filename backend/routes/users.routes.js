import express from "express";
import { getUsers } from "../controllers/users.controllers.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";

const router = express.Router();
router.get("/", protectRoute, getUsers);
export default router;
