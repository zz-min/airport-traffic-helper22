import React, { useCallback, useEffect, useState } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyListItem.scss";

const MyListItem = ({ myList_, onClick_ }) => {
  const navigate = useNavigate();

  const index = myList_[0]; //
  const airlineNm_ = myList_[1]; //
  const depPlandTime_ = myList_[2]; //
  const depAirportNm_ = myList_[3]; //
  const arrAirportNm_ = myList_[4]; //
  //console.log(parseInt(ap/100000000)+"년");
  const dateFormat =
    depPlandTime_.slice(0, 4) +
    "/" +
    depPlandTime_.slice(4, 6) +
    "/" +
    depPlandTime_.slice(6, 8);

  const timeFormat =
    depPlandTime_.slice(8, 10) + ":" + depPlandTime_.slice(10, 12);
  const onClick = useCallback(async () => {
    onClick_(index);
  }, []);

  return (
    <div className="MyListItem">
      <div className="checkbox" onClick={onClick}>
        <MdCheckBoxOutlineBlank />
        <div className="text">{airlineNm_}</div>
        <div className="text">{depAirportNm_}공항 출발</div>
        <div className="text">{arrAirportNm_}공항 도착</div>
        <div className="text">{dateFormat}</div>
        <div className="text">{timeFormat} 출발</div>
        <div className="text"></div>
      </div>
    </div>
  );
};

export default MyListItem;
