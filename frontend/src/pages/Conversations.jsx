import { useState, useEffect } from "react";
import {
  MdOutlineFileUpload,
  MdMessage,
  MdOutlineSearch,
  MdLightbulbOutline,
  MdCheckCircleOutline,
  MdAutoAwesome,
  MdDeleteOutline,
} from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import UploadModal from "../components/UploadModal";
import ConversationDetailModal from "../components/ConversationDetailModal";
import { fetchConversations, deleteConversation } from "../services/api";

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const loadConversations = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await fetchConversations();
      setConversations(data);
    } catch (err) {
      setError(err.message || "Failed to load conversations.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  const handleUploadSuccess = (newConv) => {
    setConversations((prev) => [newConv, ...prev]);
    setSelectedConversation(newConv);
    setIsDetailOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteConversation(id);
      setConversations((prev) => prev.filter((c) => c._id !== id));
      if (selectedConversation?._id === id) {
        setIsDetailOpen(false);
        setSelectedConversation(null);
      }
    } catch (err) {
      alert(err.message || "Failed to delete conversation.");
    }
  };

  // Collect unique topics across conversations
  const allTopics = Array.from(
    new Set(
      conversations.flatMap((c) => c.keyTopics || []).filter(Boolean)
    )
  );

  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.content?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTopic = selectedTopic
      ? c.keyTopics?.includes(selectedTopic)
      : true;

    return matchesSearch && matchesTopic;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-3xl text-gray-900 tracking-tight">Conversations</h1>
          <p className="text-gray-500 mt-1">
            Upload and analyze your meeting notes, transcripts, and team discussions with Gemini AI.
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

      {/* Quick Upload Dropzone Banner */}
      <div
        onClick={() => setIsUploadOpen(true)}
        className="border-2 border-dashed border-purple-200 hover:border-purple-500 transition-all duration-200 rounded-2xl p-6 sm:p-8 text-center bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 cursor-pointer shadow-xs hover:shadow-md group"
      >
        <div className="mx-auto w-14 h-14 bg-purple-100 group-hover:bg-purple-200 text-purple-600 rounded-2xl flex items-center justify-center mb-3 transition">
          <MdOutlineFileUpload size={30} />
        </div>
        <h3 className="text-lg font-bold text-gray-800">
          Upload .TXT transcript or paste conversation
        </h3>
        <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
          Drop your transcript files here or copy-paste text to extract summaries, key decisions, and action items in seconds.
        </p>
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-purple-600 group-hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition shadow-xs"
        >
          Start AI Analysis
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-2">
        <div className="relative w-full md:w-96">
          <MdOutlineSearch
            size={20}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by keyword, title, or summary..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 shadow-xs transition"
          />
        </div>

        {allTopics.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
            <button
              onClick={() => setSelectedTopic("")}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition shrink-0 cursor-pointer ${
                selectedTopic === ""
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              All Topics
            </button>
            {allTopics.slice(0, 6).map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(selectedTopic === topic ? "" : topic)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition shrink-0 cursor-pointer ${
                  selectedTopic === topic
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                #{topic}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Conversations List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl text-gray-900">
            All Conversations ({filteredConversations.length})
          </h2>
          {conversations.length > 0 && (
            <button
              onClick={loadConversations}
              className="text-xs text-purple-600 hover:text-purple-800 font-medium cursor-pointer"
            >
              Refresh
            </button>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={loadConversations}
              className="underline text-xs font-semibold ml-3"
            >
              Try Again
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs animate-pulse space-y-3"
              >
                <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-3 bg-gray-100 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-xs">
            <div className="mx-auto w-16 h-16 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-3">
              <MdMessage size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              {conversations.length === 0
                ? "No conversations analyzed yet"
                : "No matching conversations found"}
            </h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              {conversations.length === 0
                ? "Upload or paste your first conversation transcript to see AI-powered summaries, decisions, and action items."
                : "Try adjusting your search query or topic filters."}
            </p>
            {conversations.length === 0 && (
              <button
                onClick={() => setIsUploadOpen(true)}
                className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl shadow-xs transition"
              >
                Upload First Conversation
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredConversations.map((conv) => {
              const formattedDate = conv.createdAt
                ? new Date(conv.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Recent";

              return (
                <div
                  key={conv._id}
                  onClick={() => {
                    setSelectedConversation(conv);
                    setIsDetailOpen(true);
                  }}
                  className="bg-white border border-gray-200/90 hover:border-purple-300 hover:shadow-md transition-all duration-200 rounded-2xl p-5 shadow-xs cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition">
                        <MdAutoAwesome size={18} />
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-purple-700 transition text-base md:text-lg">
                        {conv.title}
                      </h3>
                      <span className="text-xs text-gray-400 font-normal">
                        • {formattedDate}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed pl-1">
                      {conv.summary || conv.content?.slice(0, 160) + "..."}
                    </p>

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 pl-1">
                      {conv.decisions?.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-800 font-medium px-2.5 py-0.5 rounded-md border border-amber-100">
                          <MdLightbulbOutline size={13} />
                          <span>{conv.decisions.length} Decisions</span>
                        </span>
                      )}
                      {conv.actionItems?.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-800 font-medium px-2.5 py-0.5 rounded-md border border-emerald-100">
                          <MdCheckCircleOutline size={13} />
                          <span>{conv.actionItems.length} Action Items</span>
                        </span>
                      )}
                      {conv.keyTopics?.slice(0, 3).map((topic, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-100 text-gray-600 font-normal px-2 py-0.5 rounded-md"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center md:flex-col items-end justify-between md:justify-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                    <span className="text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-full">
                      AI Processed
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(conv._id);
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete conversation"
                    >
                      <MdDeleteOutline size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

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

export default Conversations;
