import React from "react";
import "./FlightTemplate.css";

const FlightTemplate = ({ children }) => {
  return (
    <div className="FlightTemplate">
      <div className="title">항공권 조회</div>
      <div className="content">{children}</div>
    </div>
  );
};
export default FlightTemplate;
