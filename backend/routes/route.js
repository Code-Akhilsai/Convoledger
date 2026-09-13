import { Router } from "express";
import {
  createConversation,
  getAllConversations,
  getConversationById,
  deleteConversation,
  getDashboardMetrics,
} from "../controllers/conversations.controller.js";
import {
  register,
  login,
  getMe,
  logout,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Authentication routes
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/me", verifyToken, getMe);
router.post("/auth/logout", logout);

// Protected dashboard and conversation routes
router.get("/dashboard/metrics", verifyToken, getDashboardMetrics);
router.post("/conversations", verifyToken, createConversation);
router.get("/conversations", verifyToken, getAllConversations);
router.get("/conversations/:id", verifyToken, getConversationById);
router.delete("/conversations/:id", verifyToken, deleteConversation);

export default router;
