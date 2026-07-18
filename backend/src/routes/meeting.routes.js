import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createMeeting,
  joinMeeting,
} from "../controllers/meeting.controller.js";

const router = Router();

// Protected route
router.post("/create", authMiddleware, createMeeting);
router.get("/:meetingId", authMiddleware, joinMeeting);

export default router;
