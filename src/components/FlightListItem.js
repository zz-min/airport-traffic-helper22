import React from "react";
import{MdCheckBoxOutlineBlank,MdCheckBox}from "react-icons/md";
import "./FlightListItem.scss";

const FlightListItem=({flightItem})=> {
    const {vihicleId,arrPlandTime,depPlandTime}=flightItem;
    
    return(
        <div className="FlightListItem">
            <div className="checkbox">
                <MdCheckBoxOutlineBlank/>
            <div className="text">{vihicleId}</div>
            <div className="text">{arrPlandTime}</div>
            <div className="text">{depPlandTime}</div>
            </div>
            
        </div>
    )
}
export default FlightListItem;