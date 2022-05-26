import React from "react";
import FlightListItem from "../components/FlightListItem";
import "./FlightList.scss";

const FlightList = ({ flightList }) => {
  return (
    <div className="FlightList">
      {flightList.map((flight) => (
        <FlightListItem flight={flight} key={flight.vihicleId} />
      ))}
    </div>
  );
};
export default FlightList;
