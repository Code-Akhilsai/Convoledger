import Metrics from "../components/Metrics";
import Profilebar from "../components/Profilebar";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 shadow-sm">
          <Profilebar />
        </header>

        <main className="p-6 flex-1">
          <p className="font-bold text-3xl font-sans">👋🏼 Hello, Akhil Sai </p>
          <Metrics />

          <section>
            <p className="font-bold mt-11 text-xl ml-5 text-neutral-900">
              Recent Conversations
            </p>

            <div className="h-20 w-100 bg-blue-100 rounded-2xl p-6 shadow-md mt-5">
              <p>When is the documentations is going submitted?</p>
            </div>
            <div className="h-20 w-100 bg-blue-100 rounded-2xl p-6 shadow-md mt-5">
              <p>When is the documentations is going submitted?</p>
            </div>
            <div className="h-20 w-100 bg-blue-100 rounded-2xl p-6 shadow-md mt-5">
              <p>When is the documentations is going submitted?</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
