import profile from "../assets/image.png";

const Profilebar = () => {
  return (
    <div className="inline-flex items-center gap-2">
      <img src={profile} className="h-10 w-10" />
      <p>Akhil Sai</p>
    </div>
  );
};

export default Profilebar;
