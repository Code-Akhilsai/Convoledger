import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Profilebar from "./Profilebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 shadow-sm sticky top-0 z-10">
          <Profilebar />
        </header>

        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
