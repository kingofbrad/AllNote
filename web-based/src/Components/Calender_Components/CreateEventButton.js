import React, { useContext } from "react";
import plusSvg from "../../Assets/Calender_Assets/plus.svg";
import GlobalContext from "../../context/GlobalContext";
const CreateEventButton = () => {
    const {setShowEventModal} = useContext(GlobalContext)
  return (

    <button onClick={()=> setShowEventModal(true)} className="border p-2 roudned-full flex items-center shadow-md hover:shadow-2xl">
      <img src={plusSvg} alt="Create_event" className="w-7 h-7" />
      <span className="pl-3 pr-7"> Create</span>
    </button>
  );
};

export default CreateEventButton;