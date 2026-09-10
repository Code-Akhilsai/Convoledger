import Metrics from "../components/Metrics";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl text-gray-800">👋🏼 Hello, Akhil Sai</h1>
        <p className="text-gray-500 mt-1">Here is what is happening with your conversations today.</p>
      </div>

      <Metrics />

      <section className="mt-8">
        <h2 className="font-bold text-xl text-neutral-900 mb-4">
          Recent Conversations
        </h2>

        <div className="space-y-3 max-w-3xl">
          <div className="bg-blue-50 border border-blue-100 hover:border-blue-300 transition-colors rounded-2xl p-5 shadow-sm">
            <p className="text-gray-800 font-medium">When is the documentation going to be submitted?</p>
            <span className="text-xs text-gray-500 mt-1 inline-block">Updated 2 hours ago</span>
          </div>
          <div className="bg-blue-50 border border-blue-100 hover:border-blue-300 transition-colors rounded-2xl p-5 shadow-sm">
            <p className="text-gray-800 font-medium">API integration review with backend team</p>
            <span className="text-xs text-gray-500 mt-1 inline-block">Updated yesterday</span>
          </div>
          <div className="bg-blue-50 border border-blue-100 hover:border-blue-300 transition-colors rounded-2xl p-5 shadow-sm">
            <p className="text-gray-800 font-medium">Q3 Sprint Retrospective and key action items</p>
            <span className="text-xs text-gray-500 mt-1 inline-block">Updated 3 days ago</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
