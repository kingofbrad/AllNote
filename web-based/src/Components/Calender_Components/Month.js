import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Day from "./Day";

const Month = ({ month }) => {
  return (
    <React.Fragment>
      <div className="flex-1 grid grid-cols-7 grid-rows-5 ">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day day={day} key={idx} rowIdx={i} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Month;
