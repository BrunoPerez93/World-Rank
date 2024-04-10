import { useState } from "react";

const ButtonComponnent = ({ region, onClick }) => {

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onClick(region);
  };

  return (
    <button className={`text-custom-light-gray bg-transparent p-5 m-5 rounded-[15px] ${isActive ? 'bg-custom-dark text-custom-light-white' : 'bg-transparent'}`}
      onClick={handleClick}
    >
      {region}
    </button>
  );
};

export default ButtonComponnent;