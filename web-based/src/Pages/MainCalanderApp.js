import { Box, Flex } from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../Data/ulti";
import CalenderHeader from "../Components/Calender_Components/CalenderHeader";
import Month from "../Components/Calender_Components/Month";
import SideBar from "../Components/Calender_Components/Sidebar";
import EventModal from "../Components/Calender_Components/EventModal";

const MainCalanderApp = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
    {showEventModal && <EventModal/>}
      <div className="h-screen flex flex-col">
        <CalenderHeader />
        <Flex flex={1}>
          <SideBar />
          <Month month={currentMonth} />
        </Flex>
      </div>
    </>
  );
};

export default MainCalanderApp;
