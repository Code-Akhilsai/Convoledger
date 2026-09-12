import { useState, useEffect } from "react";
import { TbDatabaseFilled, TbCategory } from "react-icons/tb";
import { fetchConversations } from "../services/api";

const ProjectMemory = () => {
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

  const topicsMap = {};
  conversations.forEach((c) => {
    (c.keyTopics || []).forEach((t) => {
      const topic = t.trim();
      if (!topic) return;
      if (!topicsMap[topic]) {
        topicsMap[topic] = [];
      }
      topicsMap[topic].push(c);
    });
  });

  const topicsList = Object.entries(topicsMap);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div>
        <h1 className="font-bold text-2xl sm:text-3xl text-gray-900 tracking-tight">Project Memory & Topics</h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Knowledge graph and topic repository structured from all processed transcripts.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-white rounded-xl border border-gray-200 animate-pulse h-16"></div>
          ))}
        </div>
      ) : topicsList.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 text-center text-gray-500">
          <TbDatabaseFilled size={40} className="mx-auto text-gray-300 mb-2" />
          <p className="font-semibold">No project memory topics found.</p>
          <p className="text-xs mt-1">AI-extracted topics will automatically organize knowledge here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topicsList.map(([topic, convs]) => (
            <div
              key={topic}
              className="p-4 sm:p-5 bg-white border border-purple-100 hover:border-purple-300 rounded-2xl shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-2 bg-purple-100 text-purple-700 rounded-lg shrink-0">
                    <TbCategory size={18} />
                  </div>
                  <h3 className="font-bold text-gray-900 truncate">#{topic}</h3>
                </div>
                <span className="text-xs bg-purple-50 text-purple-700 font-semibold px-2.5 py-1 rounded-full shrink-0">
                  {convs.length} {convs.length === 1 ? "Discussion" : "Discussions"}
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                {convs.map((c) => (
                  <div key={c._id} className="text-xs text-gray-600 truncate flex items-center gap-1.5">
                    <span className="text-purple-400">•</span>
                    <span>{c.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectMemory;
