# ConvoLedger 

## Live: https://convoledger.netlify.app

> Turn project conversations into structured, actionable project knowledge.

ConvoLedger is an AI-powered conversation intelligence tool for project and team discussions. It takes an unstructured conversation and extracts the information that teams usually need to remember: summaries, decisions, action items, and key topics.

## Problem

Important project decisions and tasks are often buried inside long conversations. Team members may forget what was decided, who is responsible for a task, or what needs to happen next.

ConvoLedger converts those conversations into structured project knowledge that can be reviewed later.

## Core Workflow

```text
Conversation
     ↓
Paste text / Upload .txt
     ↓
Store conversation
     ↓
AI Analysis
     ↓
Extract structured knowledge
     ↓
Summary + Decisions + Action Items + Key Topics
     ↓
Save analysis
     ↓
View conversation and project knowledge
```

## Features

- Paste a project/team conversation for analysis
- Upload `.txt` conversation files
- Store conversations in MongoDB
- AI-powered conversation analysis
- Generate concise summaries
- Extract important decisions
- Extract action items from discussions
- Identify key topics
- View the original conversation together with its analysis
- Re-analyze conversations when required

## AI Analysis

For each conversation, ConvoLedger extracts structured information such as:

```json
{
  "summary": "A concise summary of the discussion.",
  "decisions": [
    "Use Razorpay as the payment provider"
  ],
  "actionItems": [
    "Priya will request the API credentials",
    "Akhil will build the payment UI"
  ],
  "keyTopics": [
    "Payments",
    "Razorpay",
    "Backend Integration"
  ]
}
```

The goal is not simply to summarize a conversation, but to identify the information that can be acted upon and remembered by a project team.

## Tech Stack

- React
- Node.js
- Express.js
- MongoDB
- Mongoose
- AI/LLM integration
- REST API

## Data Model

The MVP stores each conversation together with its generated analysis.

```text
Conversation
├── title
├── content
├── summary
├── decisions[]
├── actionItems[]
├── keyTopics[]
├── createdAt
└── updatedAt
```

Authentication and user accounts are intentionally outside the initial MVP scope.

## Example

### Input

```text
Priya: The client wants the new payment feature by next Monday.

Akhil: That's a bit tight. Do we already have the payment API credentials?

Priya: Not yet. I'll ask the client for them today.

Rahul: Which payment provider are we going with, Stripe or Razorpay?

Priya: Razorpay for now. The client prefers it.

Akhil: Okay. I'll build the payment UI and connect it once the API is ready.

Rahul: I'll handle the backend integration and webhook.

Priya: Great. Let's have a quick demo on Friday before we show it to the client.
```

### Extracted Knowledge

**Decision**
- Razorpay selected as the payment provider.
- Demo scheduled for Friday.

**Action Items**
- Priya → Request payment API credentials.
- Akhil → Build the payment UI.
- Rahul → Handle backend integration and webhook.

**Key Topics**
- Payments
- Razorpay
- Backend integration
- Webhooks
- Client demo

## Project Goals

The MVP focuses on one simple idea:

> **Don't let important project knowledge disappear inside conversations.**

Future versions can expand this into a complete project memory system with persistent tasks, decisions, integrations, authentication, and collaboration features.

## Future Improvements

- User authentication and authorization
- Dedicated task management
- Dedicated decision tracking
- PDF/DOCX support
- Slack/Discord/other chat integrations
- Search across project conversations
- Task status and assignee tracking
- Project-level knowledge base
- Notifications and reminders
- Improved AI extraction and confidence handling

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Code-Akhilsai/Convoledger.git
cd Convoledger
```

Install dependencies for the frontend and backend according to the project setup.

Create the required environment variables for the backend, including the MongoDB connection string and AI API credentials.

Start the backend and frontend development servers.

> Note: Use the environment variable names already defined in the project. Never commit API keys, database credentials, or other secrets to GitHub.

## Project Status

**MVP completed.**

The current version focuses on the core conversation-to-knowledge pipeline:

**Input → Store → Analyze → Extract → Save → Display**

---

Built with ❤️ by **Akhil Sai**
