import { TiHome } from "react-icons/ti";
import { MdMessage, MdLightbulb } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import { TbDatabaseFilled } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <div className="h-screen w-65 bg-purple-700">
      <p className="text-white text-2xl font-semibold text-center pt-4">
        Convoledger
      </p>
      <div className="pl-10 flex flex-col gap-10 mt-8 text-white text-[18px]">
        <p className="inline-flex items-center gap-2 ">
          <TiHome size={23} />
          Dashborad
        </p>
        <p className="inline-flex items-center gap-2 ">
          <MdMessage size={20} />
          Coversations
        </p>
        <p className="inline-flex items-center gap-2 ">
          <IoCheckbox />
          Tasks
        </p>
        <p className="inline-flex items-center gap-2 ">
          {" "}
          <MdLightbulb size={21} />
          Decisions
        </p>
        <p className="inline-flex items-center gap-2 ">
          {" "}
          <TbDatabaseFilled size={20} />
          Project Memory
        </p>
      </div>
      <button className="inline-flex items-center gap-2 h-14 w-50 bg-blue-600 rounded-2xl text-[17px] pl-4 text-white m-6 ">
        {" "}
        <FaPlus />
        New Conversation
      </button>
    </div>
  );
};

export default Sidebar;
