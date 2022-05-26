import React, { useCallback, useEffect, useState } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FlightListItem.scss";

const FlightListItem = ({ flight }) => {
  const navigate = useNavigate();
  const [num, setNum] = useState();
  const {
    airlineNm,
    depAirportNm,
    arrAirportNm,
    vihicleId,
    depTime,
    arrPlandTime,
    depPlandTime,
  } = flight;
  const [flightInfo, setFlightInfo] = useState([]);

  const onClick1 = useCallback(async (text) => {
    const r1 = await axios.get(
      "https://ts0xq3oxy8.execute-api.ap-northeast-2.amazonaws.com/index"
    );
    console.log(r1);
    console.log(r1.data.Items);
    var num_ = 0;
    r1.data.Items.forEach((t) => {
      var ap = t.index;
      //console.log(t);

      if (num_ < ap.N) {
        num_ = ap.N;
        console.log(ap.N);
      }
      console.log(num_);
    });
    //alert("클릭");
    /* const r2 = await axios.put(
      `https://ts0xq3oxy8.execute-api.ap-northeast-2.amazonaws.com/items`,
      {
        id: localStorage.getItem("id"),
        index: num,
        depPlandTime: depTime,
        depAirportNm: depAirportNm,
        arrAirportNm: arrAirportNm,
        airlineNm: airlineNm,
      }
    );
    setNum(num + 1);
    navigate("/myPage"); */
  }, []);

  return (
    <div className="FlightListItem">
      <div className="checkbox" onClick={onClick1}>
        <MdCheckBoxOutlineBlank />
        <div className="text">{airlineNm}</div>
        <div className="text">
          {depAirportNm}({depPlandTime})출발
        </div>
        <div className="text">
          {arrAirportNm}({arrPlandTime})도착
        </div>
        <div className="text"></div>
      </div>
    </div>
  );
};
export default FlightListItem;
