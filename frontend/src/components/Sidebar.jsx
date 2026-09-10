import { TiHome } from "react-icons/ti";
import { MdMessage, MdLightbulb } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import { TbDatabaseFilled } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/", icon: <TiHome size={22} /> },
    { name: "Conversations", path: "/conversations", icon: <MdMessage size={20} /> },
    { name: "Tasks", path: "/tasks", icon: <IoCheckbox size={20} /> },
    { name: "Decisions", path: "/decisions", icon: <MdLightbulb size={21} /> },
    { name: "Project Memory", path: "/project-memory", icon: <TbDatabaseFilled size={20} /> },
  ];

  return (
    <aside className="h-screen sticky top-0 w-64 bg-purple-700 text-white flex flex-col justify-between py-6 px-4 shadow-xl z-20 shrink-0">
      <div>
        <h1 className="text-white text-2xl font-bold text-center tracking-wide mb-8">
          Convoledger
        </h1>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-purple-900/60 text-white font-semibold shadow-inner"
                    : "text-purple-100 hover:bg-purple-600/70 hover:text-white"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="px-2">
        <button
          onClick={() => navigate("/conversations")}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 active:scale-98 transition-all rounded-xl text-[16px] font-medium text-white shadow-md cursor-pointer"
        >
          <FaPlus />
          <span>New Conversation</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
