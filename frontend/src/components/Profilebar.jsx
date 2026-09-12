import profile from "../assets/image.png";

const Profilebar = () => {
  return (
    <div className="inline-flex items-center gap-2.5">
      <img
        src={profile}
        alt="Profile"
        className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover ring-2 ring-purple-100"
      />
      <p className="text-sm font-semibold text-gray-800 hidden xs:inline sm:inline">
        Akhil Sai
      </p>
    </div>
  );
};

export default Profilebar;
