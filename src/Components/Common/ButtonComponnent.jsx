import { useState } from "react";

const ButtonComponnent = ({ region, onClick }) => {

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onClick(region);
    console.log('hola');
  };

  return (
    <button className={`text-custom-light-white bg-transparent p-5 m-5 rounded-[15px] ${isActive ? 'bg-custom-light-gray' : 'bg-transparent'}`}
      onClick={handleClick}
    >
      {region}
    </button>
  );
};

export default ButtonComponnent;