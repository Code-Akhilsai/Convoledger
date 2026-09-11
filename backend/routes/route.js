import { Router } from "express";
import {
  createConversation,
  getAllConversations,
  getConversationById,
  deleteConversation,
  getDashboardMetrics,
} from "../controllers/conversations.controller.js";

const router = Router();

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Dashboard metrics
router.get("/dashboard/metrics", getDashboardMetrics);

// Conversations CRUD & AI processing
router.post("/conversations", createConversation);
router.get("/conversations", getAllConversations);
router.get("/conversations/:id", getConversationById);
router.delete("/conversations/:id", deleteConversation);

export default router;
