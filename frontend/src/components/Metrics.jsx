import { MdOutlineMessage, MdOutlineLightbulb, MdCheckCircleOutline } from "react-icons/md";
import { TbCategory } from "react-icons/tb";

const Metrics = ({ metrics = {} }) => {
  const {
    totalConversations = 0,
    totalActionItems = 0,
    totalDecisions = 0,
    totalTopics = 0,
  } = metrics;

  const items = [
    {
      title: "Conversations",
      value: totalConversations,
      icon: <MdOutlineMessage size={24} />,
      bg: "bg-blue-50 text-blue-600 border-blue-100",
      iconBg: "bg-blue-100 text-blue-700",
      subtext: "Total recorded",
    },
    {
      title: "Action Items",
      value: totalActionItems,
      icon: <MdCheckCircleOutline size={24} />,
      bg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      iconBg: "bg-emerald-100 text-emerald-700",
      subtext: "Tasks extracted",
    },
    {
      title: "Key Decisions",
      value: totalDecisions,
      icon: <MdOutlineLightbulb size={24} />,
      bg: "bg-amber-50 text-amber-600 border-amber-100",
      iconBg: "bg-amber-100 text-amber-700",
      subtext: "Consensus tracked",
    },
    {
      title: "Topics Covered",
      value: totalTopics,
      icon: <TbCategory size={24} />,
      bg: "bg-purple-50 text-purple-600 border-purple-100",
      iconBg: "bg-purple-100 text-purple-700",
      subtext: "Knowledge tags",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={`p-4 sm:p-5 rounded-2xl border bg-white shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-between gap-4`}
        >
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {item.title}
            </p>
            <p className="font-extrabold text-3xl text-gray-900 tracking-tight">
              {item.value}
            </p>
            <p className="text-xs text-gray-400 font-medium">{item.subtext}</p>
          </div>
          <div className={`p-3.5 rounded-2xl ${item.iconBg} shrink-0`}>
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Metrics;
