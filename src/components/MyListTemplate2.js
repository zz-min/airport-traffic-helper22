import React, { useState, useEffect } from "react";
import axios from "axios";
import Map from "../components/Map";
import "./MyListTemplate2.scss";

const MyListTemplate2 = ({ selectIndex }) => {
  const [btnItemNum, setBtnItemNum] = useState(1);
  const [btnItemValue, setBtnItemValue] = useState();
  const [arrAirportNm, setArrAirportNm] = useState();
  const [depAirportNm, setDepAirportNm] = useState();

  useEffect(() => {
    setting();
  }, [btnItemNum, selectIndex]);

  const setting = async () => {
    const r = await axios.get(
      `https://ts0xq3oxy8.execute-api.ap-northeast-2.amazonaws.com/index/${selectIndex}`
    );

    var depAirportNm_ = r.data.Items[0].depAirportNm;
    var arrAirportNm_ = r.data.Items[0].arrAirportNm;
    setArrAirportNm(arrAirportNm_.S);
    setDepAirportNm(depAirportNm_.S);
    //console.log(arrAirportNm);
    //console.log(arrAirportNm_.S);
    var str = [depAirportNm_.S, arrAirportNm_.S];
    console.log(str);
    setBtnItemValue(str);
  };

  return (
    <div className="MyListTemplate">
      <div className="title">조회할 버튼을 클릭하세요</div>
      <div className="content">
        <div className="btnBox">
          <div
            className="btnBox_item"
            id="btnBox_item_1"
            onClick={() => setBtnItemNum(1)}
          >
            출발지 -> 출발공항
          </div>
          <div
            className="btnBox_item"
            id="btnBox_item_2"
            onClick={() => setBtnItemNum(2)}
          >
            도착공항 -> 도착지
          </div>
        </div>
        <div className="mapContainer">
          {/* d<hr></hr> */}
          <Map btnItemNum={btnItemNum} btnItemValue={btnItemValue}></Map>
        </div>
      </div>
    </div>
  );
};
export default MyListTemplate2;
/* 
<div
            className="btnBox_item"
            id="btnBox_item_3"
            onClick={() => setBtnItemNum(3)}
          >
            출발공항 근처 주차장정보{" "}
          </div>
           */
