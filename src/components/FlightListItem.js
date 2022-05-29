import React, { useCallback, useEffect, useState } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FlightListItem.scss";

const FlightListItem = ({ flight }) => {
  const navigate = useNavigate();

  const airlineNm = flight[0]; //아시아나항공
  const depAirportNm = flight[1]; //춟발공항 광주
  const arrAirportNm = flight[2]; //도착공항 제주
  const vihicleId = flight[3]; //항공편비행기ID
  const depTime = flight[4]; ////YYYYMMDDHHMI 출발날짜시간
  const arrPlandTime = flight[5]; //도착시간-가공버전 15 : 30
  const depPlandTime = flight[6]; //출발시간-가공버전 14 : 40

  const [flightInfo, setFlightInfo] = useState([]);

  const onClick = useCallback(async (text) => {
    const r1 = await axios.get(
      "https://ts0xq3oxy8.execute-api.ap-northeast-2.amazonaws.com/items"
    );
    var newIndex = r1.data.Count;
    const r2 = await axios.put(
      `https://ts0xq3oxy8.execute-api.ap-northeast-2.amazonaws.com/items`,
      {
        index: newIndex,
        airlineNm: airlineNm,
        arrAirportNm: arrAirportNm,
        depAirportNm: depAirportNm,
        depPlandTime: depTime,
        id: localStorage.getItem("id"),
        validation: true,
      }
    );
    navigate("/myPage");
  }, []);

  return (
    <div className="FlightListItem">
      <div className="checkbox" onClick={onClick}>
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
