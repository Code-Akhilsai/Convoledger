import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      default: "",
    },

    decisions: [
      {
        type: String,
      },
    ],

    actionItems: [
      {
        type: String,
      },
    ],

    keyTopics: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
