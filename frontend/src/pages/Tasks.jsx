import { useState, useEffect } from "react";
import { MdCheckCircleOutline, MdRadioButtonUnchecked, MdCheckCircle } from "react-icons/md";
import { fetchConversations } from "../services/api";

const Tasks = () => {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("completed_tasks") || "[]");
    } catch {
      return [];
    }
  });

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

  const toggleTask = (taskKey) => {
    const next = completedTasks.includes(taskKey)
      ? completedTasks.filter((k) => k !== taskKey)
      : [...completedTasks, taskKey];
    setCompletedTasks(next);
    localStorage.setItem("completed_tasks", JSON.stringify(next));
  };

  const allTasks = conversations.flatMap((c) =>
    (c.actionItems || []).map((item, idx) => ({
      key: `${c._id}-${idx}`,
      text: item,
      conversationTitle: c.title,
      conversationId: c._id,
      date: c.createdAt,
    }))
  );

  const completedCount = allTasks.filter((t) => completedTasks.includes(t.key)).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div>
        <h1 className="font-bold text-3xl text-gray-900 tracking-tight">Action Items & Tasks</h1>
        <p className="text-gray-500 mt-1">
          Aggregated actionable tasks extracted from all meetings and conversations.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Progress</p>
          <p className="text-2xl font-bold text-gray-900">
            {completedCount} of {allTasks.length} Completed
          </p>
        </div>
        <div className="w-48 bg-gray-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{
              width: `${allTasks.length > 0 ? (completedCount / allTasks.length) * 100 : 0}%`,
            }}
          ></div>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-white rounded-xl border border-gray-200 animate-pulse h-16"></div>
          ))}
        </div>
      ) : allTasks.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500">
          <MdCheckCircleOutline size={40} className="mx-auto text-gray-300 mb-2" />
          <p className="font-semibold">No action items found.</p>
          <p className="text-xs mt-1">Upload conversations to automatically generate action items.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {allTasks.map((task) => {
            const isDone = completedTasks.includes(task.key);
            return (
              <div
                key={task.key}
                onClick={() => toggleTask(task.key)}
                className={`p-4 rounded-xl border transition cursor-pointer flex items-start gap-3.5 ${
                  isDone
                    ? "bg-emerald-50/40 border-emerald-200 text-gray-400"
                    : "bg-white border-gray-200 hover:border-purple-300 text-gray-800 shadow-xs"
                }`}
              >
                <div className="mt-0.5 text-xl text-emerald-600 shrink-0">
                  {isDone ? <MdCheckCircle /> : <MdRadioButtonUnchecked className="text-gray-400" />}
                </div>
                <div className="flex-1 space-y-1">
                  <p className={`text-sm font-medium ${isDone ? "line-through text-gray-500" : "text-gray-900"}`}>
                    {task.text}
                  </p>
                  <p className="text-xs text-gray-400">
                    From conversation: <span className="text-purple-600 font-medium">{task.conversationTitle}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Tasks;
