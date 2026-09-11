import { useState, useEffect } from "react";
import { MdLightbulbOutline, MdOutlineFormatQuote } from "react-icons/md";
import { fetchConversations } from "../services/api";

const Decisions = () => {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchConversations();
        setConversations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const allDecisions = conversations.flatMap((c) =>
    (c.decisions || []).map((item, idx) => ({
      key: `${c._id}-${idx}`,
      text: item,
      conversationTitle: c.title,
      conversationId: c._id,
      date: c.createdAt,
    }))
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div>
        <h1 className="font-bold text-3xl text-gray-900 tracking-tight">Key Decisions Ledger</h1>
        <p className="text-gray-500 mt-1">
          A persistent record of all engineering, product, and business decisions finalized in discussions.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-white rounded-xl border border-gray-200 animate-pulse h-16"></div>
          ))}
        </div>
      ) : allDecisions.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500">
          <MdLightbulbOutline size={40} className="mx-auto text-gray-300 mb-2" />
          <p className="font-semibold">No decisions recorded yet.</p>
          <p className="text-xs mt-1">Decisions agreed upon in conversations will automatically appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allDecisions.map((decision) => (
            <div
              key={decision.key}
              className="p-5 bg-white border border-amber-200/80 hover:border-amber-300 rounded-2xl shadow-xs transition space-y-3 flex flex-col justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-xl mt-0.5 shrink-0">
                  <MdOutlineFormatQuote size={20} />
                </div>
                <p className="text-sm font-semibold text-gray-800 leading-relaxed">
                  {decision.text}
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span className="truncate max-w-[200px] text-purple-600 font-medium">
                  {decision.conversationTitle}
                </span>
                <span>
                  {decision.date
                    ? new Date(decision.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "Recent"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Decisions;
