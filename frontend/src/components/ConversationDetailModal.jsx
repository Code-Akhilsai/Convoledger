import { useState } from "react";
import {
  MdClose,
  MdOutlineLightbulb,
  MdCheckCircleOutline,
  MdOutlineTopic,
  MdDeleteOutline,
  MdOutlineFormatQuote,
  MdCalendarToday,
} from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";

const ConversationDetailModal = ({
  conversation,
  isOpen,
  onClose,
  onDelete,
}) => {
  const [showRawTranscript, setShowRawTranscript] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !conversation) return null;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      setIsDeleting(true);
      await onDelete(conversation._id);
      setIsDeleting(false);
      onClose();
    }
  };

  const formattedDate = conversation.createdAt
    ? new Date(conversation.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Recently";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-2.5 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[94vh] sm:max-h-[92vh] flex flex-col overflow-hidden border border-gray-100">
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-linear-to-r from-purple-50/70 via-indigo-50/40 to-blue-50/50 flex items-start justify-between">
          <div className="space-y-1.5 max-w-[85%]">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-purple-700 uppercase tracking-wider">
              <span className="px-2.5 py-0.5 bg-purple-100 rounded-full">
                AI Executive Brief
              </span>
              <span className="flex items-center gap-1 text-gray-500 font-normal">
                <MdCalendarToday size={13} /> {formattedDate}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-snug">
              {conversation.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-700 hover:bg-white rounded-xl transition shadow-xs cursor-pointer"
          >
            <MdClose size={22} />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 sm:space-y-6">
          <div className="bg-linear-to-br from-purple-50/60 to-blue-50/60 rounded-2xl p-4 sm:p-5 border border-purple-100/80 shadow-xs">
            <div className="flex items-center gap-2 text-purple-800 font-semibold text-sm mb-2">
              <MdOutlineFormatQuote size={20} className="text-purple-600" />
              <span>Summary</span>
            </div>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {conversation.summary || "No summary available yet."}
            </p>
          </div>

          {conversation.keyTopics && conversation.keyTopics.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                <MdOutlineTopic size={16} />
                <span>Key Topics</span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {conversation.keyTopics.map((topic, i) => (
                  <span
                    key={i}
                    className="px-2.5 sm:px-3 py-1 bg-gray-100 hover:bg-purple-100 hover:text-purple-800 text-gray-700 text-xs font-medium rounded-lg transition"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div className="bg-amber-50/50 border border-amber-200/70 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                <div className="p-1 bg-amber-100 text-amber-700 rounded-lg">
                  <MdOutlineLightbulb size={18} />
                </div>
                <span>Decisions ({conversation.decisions?.length || 0})</span>
              </div>

              {conversation.decisions && conversation.decisions.length > 0 ? (
                <ul className="space-y-2">
                  {conversation.decisions.map((decision, index) => (
                    <li
                      key={index}
                      className="text-xs text-gray-700 flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-amber-100 shadow-xs"
                    >
                      <span className="text-amber-500 font-bold mt-0.5">•</span>
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-400 italic">
                  No decisions recorded.
                </p>
              )}
            </div>

            <div className="bg-emerald-50/50 border border-emerald-200/70 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <div className="p-1 bg-emerald-100 text-emerald-700 rounded-lg">
                  <MdCheckCircleOutline size={18} />
                </div>
                <span>
                  Action Items ({conversation.actionItems?.length || 0})
                </span>
              </div>

              {conversation.actionItems &&
              conversation.actionItems.length > 0 ? (
                <ul className="space-y-2">
                  {conversation.actionItems.map((item, index) => (
                    <li
                      key={index}
                      className="text-xs text-gray-700 flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-100 shadow-xs"
                    >
                      <span className="text-emerald-500 font-bold mt-0.5">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-400 italic">
                  No action items recorded.
                </p>
              )}
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowRawTranscript(!showRawTranscript)}
              className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-xs sm:text-sm font-semibold text-gray-700 transition cursor-pointer"
            >
              <span className="flex items-center gap-2 truncate">
                <FaRegFileAlt className="text-gray-500 shrink-0" />
                <span className="truncate">
                  Original Conversation Transcript
                </span>
              </span>
              <span className="text-xs text-purple-600 font-medium shrink-0 ml-2">
                {showRawTranscript ? "Hide" : "View"}
              </span>
            </button>
            {showRawTranscript && (
              <div className="p-4 bg-gray-900 text-gray-200 text-xs font-mono max-h-60 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {conversation.content}
              </div>
            )}
          </div>
        </div>

        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-gray-50 border-t border-gray-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition cursor-pointer"
          >
            <MdDeleteOutline size={18} />
            <span>{isDeleting ? "Deleting..." : "Delete Conversation"}</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium bg-gray-800 hover:bg-gray-900 text-white rounded-xl transition shadow-xs cursor-pointer text-center"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationDetailModal;
