import React from "react";
import MyListItem from "../components/MyListItem";

const MyList = ({ flightList }) => {
  return (
    <div className="FlightList">
      {flightList.map((flight) => (
        <MyListItem flight={flight} key={flight.vihicleId} />
      ))}
    </div>
  );
};
export default MyList;
