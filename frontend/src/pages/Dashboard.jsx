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
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
