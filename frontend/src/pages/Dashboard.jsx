import { useState, useEffect } from "react";
import {
  MdAutoAwesome,
  MdOutlineArrowForward,
  MdOutlineLightbulb,
  MdCheckCircleOutline,
} from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Metrics from "../components/Metrics";
import UploadModal from "../components/UploadModal";
import ConversationDetailModal from "../components/ConversationDetailModal";
import { fetchDashboardMetrics, deleteConversation } from "../services/api";

const Dashboard = () => {
  const [metricsData, setMetricsData] = useState({
    totalConversations: 0,
    totalActionItems: 0,
    totalDecisions: 0,
    totalTopics: 0,
  });
  const [recentConversations, setRecentConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchDashboardMetrics();
      if (data.metrics) {
        setMetricsData(data.metrics);
      }
      if (data.recentConversations) {
        setRecentConversations(data.recentConversations);
      }
    } catch (err) {
      console.error("Failed to load dashboard metrics:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUploadSuccess = (newConv) => {
    loadData();
    setSelectedConversation(newConv);
    setIsDetailOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteConversation(id);
      loadData();
      if (selectedConversation?._id === id) {
        setIsDetailOpen(false);
        setSelectedConversation(null);
      }
    } catch (err) {
      alert(err.message || "Failed to delete conversation.");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      {/* Header Greeting & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-3xl text-gray-900 tracking-tight">
            👋🏼 Welcome to ConvoLedger
          </h1>
          <p className="text-gray-500 mt-1">
            Here is your real-time executive intelligence digest across all meetings & conversations.
          </p>
        </div>
        <button
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer shrink-0"
        >
          <FaPlus size={14} />
          <span>New Conversation</span>
        </button>
      </div>

      {/* Metrics Row */}
      <Metrics metrics={metricsData} />

      {/* 2-Column Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Conversations */}
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl text-gray-900">
              Recent Conversations
            </h2>
            <Link
              to="/conversations"
              className="text-xs font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1 group"
            >
              <span>View All</span>
              <MdOutlineArrowForward
                size={14}
                className="group-hover:translate-x-0.5 transition"
              />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-5 bg-white rounded-2xl border border-gray-100 shadow-xs animate-pulse space-y-2"
                >
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : recentConversations.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full mx-auto flex items-center justify-center">
                <MdAutoAwesome size={24} />
              </div>
              <h3 className="font-bold text-gray-800">No conversations analyzed yet</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Upload or paste meeting transcripts to automatically extract summaries, decisions, and action items.
              </p>
              <button
                onClick={() => setIsUploadOpen(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl shadow-xs transition"
              >
                Upload Conversation
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentConversations.map((conv) => {
                const dateStr = conv.createdAt
                  ? new Date(conv.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "Recently";

                return (
                  <div
                    key={conv._id}
                    onClick={() => {
                      setSelectedConversation(conv);
                      setIsDetailOpen(true);
                    }}
                    className="bg-white border border-gray-200/80 hover:border-purple-300 hover:shadow-md transition-all duration-200 rounded-2xl p-5 shadow-xs cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-gray-900 group-hover:text-purple-700 transition text-base">
                        {conv.title}
                      </h4>
                      <span className="text-xs text-gray-400 shrink-0">{dateStr}</span>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                      {conv.summary || conv.content?.slice(0, 120)}
                    </p>

                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 text-xs">
                      {conv.decisions?.length > 0 && (
                        <span className="text-amber-700 font-medium flex items-center gap-1">
                          <MdOutlineLightbulb size={14} />
                          {conv.decisions.length} Decisions
                        </span>
                      )}
                      {conv.actionItems?.length > 0 && (
                        <span className="text-emerald-700 font-medium flex items-center gap-1">
                          <MdCheckCircleOutline size={14} />
                          {conv.actionItems.length} Tasks
                        </span>
                      )}
                      <span className="ml-auto text-purple-600 font-semibold group-hover:translate-x-0.5 transition flex items-center gap-1">
                        View Brief <MdOutlineArrowForward size={12} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Right Col: Quick Upload & Intelligence Highlight */}
        <section className="space-y-4">
          <h2 className="font-bold text-xl text-gray-900">Quick Actions</h2>

          <div className="bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 text-white rounded-2xl p-6 shadow-md space-y-4">
            <div className="p-2.5 bg-white/10 w-fit rounded-xl backdrop-blur-xs">
              <MdAutoAwesome size={24} className="text-yellow-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg">AI Transcript Analyzer</h3>
              <p className="text-xs text-purple-100 mt-1 leading-relaxed">
                Paste meeting transcripts or upload .TXT files. Gemini AI parses key topics, extracts task owners, and logs critical decisions instantly.
              </p>
            </div>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="w-full py-2.5 px-4 bg-white text-purple-900 font-bold text-sm rounded-xl hover:bg-purple-50 active:scale-98 transition shadow-xs cursor-pointer"
            >
              Analyze New Conversation
            </button>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-gray-900">
              Workflow Status
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 text-green-800">
                <span className="font-medium">gemini-3.5-flash-lite</span>
                <span className="font-semibold">Active</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 text-blue-800">
                <span className="font-medium">Structured JSON Pipeline</span>
                <span className="font-semibold">Enabled</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-purple-50 text-purple-800">
                <span className="font-medium">MongoDB Sync</span>
                <span className="font-semibold">Connected</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modals */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={handleUploadSuccess}
      />

      <ConversationDetailModal
        conversation={selectedConversation}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Dashboard;
