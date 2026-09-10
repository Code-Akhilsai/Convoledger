import { MdOutlineFileUpload, MdMessage } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

const Conversations = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl text-gray-800">Conversations</h1>
          <p className="text-gray-500 mt-1">Upload and manage all your meeting & discussion notes.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl shadow transition">
          <FaPlus size={14} />
          <span>New Conversation</span>
        </button>
      </div>

      <div className="border-2 border-dashed border-gray-300 hover:border-purple-500 transition-colors rounded-2xl p-8 text-center bg-white cursor-pointer shadow-sm">
        <div className="mx-auto w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-3">
          <MdOutlineFileUpload size={28} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Upload conversation audio or transcript</h3>
        <p className="text-sm text-gray-500 mt-1">Drag and drop audio files, TXT, or PDF documents here</p>
        <button className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition">
          Browse Files
        </button>
      </div>

      <section className="mt-8">
        <h2 className="font-bold text-xl text-neutral-900 mb-4">All Conversations</h2>
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 hover:border-purple-300 transition-all rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                <MdMessage size={22} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">When is the documentation going to be submitted?</h4>
                <p className="text-sm text-gray-500">3 participants • 18 minutes • Extracted 4 tasks</p>
              </div>
            </div>
            <span className="text-xs bg-green-100 text-green-700 font-medium px-2.5 py-1 rounded-full">
              Processed
            </span>
          </div>

          <div className="bg-white border border-gray-200 hover:border-purple-300 transition-all rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                <MdMessage size={22} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">API integration review with backend team</h4>
                <p className="text-sm text-gray-500">5 participants • 42 minutes • Extracted 7 tasks</p>
              </div>
            </div>
            <span className="text-xs bg-green-100 text-green-700 font-medium px-2.5 py-1 rounded-full">
              Processed
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Conversations;
