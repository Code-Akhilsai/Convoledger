import { MdOutlineMessage } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
const Metrics = () => {
  const metrics_details = [
    {
      icon: <MdOutlineMessage />,
      number: 45,
      title: "Conversations",
      profit: 12,
    },

    {
      icon: <MdOutlineMessage />,
      number: 40,
      title: "Pending",
      profit: 10,
    },

    {
      icon: <MdOutlineMessage />,
      number: 45,
      title: "Conversations",
      profit: 12,
    },
  ];
  return (
    <div className="flex gap-30">
      {metrics_details.map((metrics) => {
        return (
          <div className=" h-35 w-50  mt-9 ml-8 pr-3 rounded-2xl flex flex-row justify-center items-center gap-5 bg-blue-100 shadow-lg">
            <div className="bg-blue-200 p-2 rounded-xl">
              <p className="text-3xl text-blue-500">{metrics.icon}</p>
            </div>
            <div className="flex flex-col  gap-1">
              <p className="font-bold text-3xl">{metrics.number}</p>
              <p className="text-neutral-500">{metrics.title}</p>
              <p className="inline-flex items-center gap-1.5 text-green-600">
                <FaArrowUp size={16} />
                <span className="text-xl font-semibold">{metrics.profit}%</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Metrics;
