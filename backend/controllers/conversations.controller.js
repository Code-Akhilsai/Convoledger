import { Conversation } from "../models/conversations.model.js";
import { analyzeConversation } from "../src/services/gemini.service.js";

/**
 * Create a new conversation, save it, analyze with Gemini AI, and update with extracted insights
 * POST /api/conversations
 */
export const createConversation = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Conversation content is required.",
      });
    }

    const trimmedContent = content.trim();
    const initialTitle = (title && title.trim()) || "Processing Conversation...";

    const conversation = await Conversation.create({
      title: initialTitle,
      content: trimmedContent,
      summary: "",
      decisions: [],
      actionItems: [],
      keyTopics: [],
    });

    try {
      const analysis = await analyzeConversation(trimmedContent, title);

      conversation.title = analysis.title || conversation.title;
      conversation.summary = analysis.summary || "";
      conversation.decisions = analysis.decisions || [];
      conversation.actionItems = analysis.actionItems || [];
      conversation.keyTopics = analysis.keyTopics || [];

      await conversation.save();

      return res.status(201).json({
        success: true,
        message: "Conversation saved and analyzed successfully.",
        conversation,
      });
    } catch (aiError) {
      console.error("AI Analysis error after initial save:", aiError);
      return res.status(201).json({
        success: true,
        message: "Conversation saved, but AI analysis encountered a warning.",
        conversation,
      });
    }
  } catch (error) {
    console.error("Create conversation error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process conversation.",
      error: error.message,
    });
  }
};

/**
 * Get all conversations
 * GET /api/conversations
 */
export const getAllConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: conversations.length,
      conversations,
    });
  } catch (error) {
    console.error("Get all conversations error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch conversations.",
      error: error.message,
    });
  }
};

/**
 * Get a single conversation by ID
 * GET /api/conversations/:id
 */
export const getConversationById = async (req, res) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.findById(id);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found.",
      });
    }

    return res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error("Get conversation by id error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch conversation.",
      error: error.message,
    });
  }
};

/**
 * Delete conversation by ID
 * DELETE /api/conversations/:id
 */
export const deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Conversation.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Conversation deleted successfully.",
    });
  } catch (error) {
    console.error("Delete conversation error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete conversation.",
      error: error.message,
    });
  }
};

/**
 * Get dashboard metrics and recent activity
 * GET /api/dashboard/metrics
 */
export const getDashboardMetrics = async (req, res) => {
  try {
    const conversations = await Conversation.find().sort({ createdAt: -1 });

    const totalConversations = conversations.length;
    let totalActionItems = 0;
    let totalDecisions = 0;
    const uniqueTopics = new Set();

    conversations.forEach((conv) => {
      if (Array.isArray(conv.actionItems)) {
        totalActionItems += conv.actionItems.length;
      }
      if (Array.isArray(conv.decisions)) {
        totalDecisions += conv.decisions.length;
      }
      if (Array.isArray(conv.keyTopics)) {
        conv.keyTopics.forEach((topic) => {
          if (topic && topic.trim()) {
            uniqueTopics.add(topic.trim().toLowerCase());
          }
        });
      }
    });

    const recentConversations = conversations.slice(0, 5);

    return res.status(200).json({
      success: true,
      metrics: {
        totalConversations,
        totalActionItems,
        totalDecisions,
        totalTopics: uniqueTopics.size,
      },
      recentConversations,
    });
  } catch (error) {
    console.error("Get dashboard metrics error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to calculate dashboard metrics.",
      error: error.message,
    });
  }
};
