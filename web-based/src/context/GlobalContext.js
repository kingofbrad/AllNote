import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  smallCalenderMonth: 0,
  setSmallCalenderMonth: (index) =>{},
  dayselected: null,
  setDaySelected: (day) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispathCalEvent: ({type, payload}) => {},
  savedEvents: [],
  setSelectedEvent: () => {},
  selectedEvent: null,
  setLabels: () => {},
  labels: [],
  updateLabel: () => {},
  filteredEvents: [],

});

export default GlobalContext;
