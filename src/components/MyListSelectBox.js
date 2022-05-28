import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./MyListSelectBox.scss";
import { type } from "@testing-library/user-event/dist/type";

const MyListSelectBox = ({ selectIndex }) => {
  const [index, setIndex] = useState();
  const [airlineNm, setAirlineNm] = useState();
  const [arrAirportNm, setArrAirportNm] = useState();
  const [depPlandTime, setDepPlandTime] = useState();
  const [depAirportNm, setDepAirportNm] = useState();
  const [dateFormat, setDateFormat] = useState();
  const [timeFormat, setTimeFormat] = useState();

  useEffect(() => {
    //console.log("MyListSelectBox selectIndex1>>" + selectIndex);
    setting(selectIndex);
  }, [selectIndex]);

  const setting = async (selectIndex_) => {
    //console.log("MyListSelectBox setting selectIndex2>>" + selectIndex_);
    const r = await axios.get(
      `https://ts0xq3oxy8.execute-api.ap-northeast-2.amazonaws.com/index/${selectIndex_}`
    );

    var index_ = r.data.Items[0].index;
    var airlineNm_ = r.data.Items[0].airlineNm;
    var depPlandTime_ = r.data.Items[0].depPlandTime;
    var depAirportNm_ = r.data.Items[0].depAirportNm;
    var arrAirportNm_ = r.data.Items[0].arrAirportNm;
    setIndex(index_.N);
    setAirlineNm(airlineNm_.S);
    setArrAirportNm(arrAirportNm_.S);
    setDepPlandTime(depPlandTime_.N);
    setDepAirportNm(depAirportNm_.S);

    var str =
      depPlandTime_.N.slice(0, 4) +
      "/" +
      depPlandTime_.N.slice(4, 6) +
      "/" +
      depPlandTime_.N.slice(6, 8);
    setDateFormat(str);
    str = depPlandTime_.N.slice(8, 10) + ":" + depPlandTime_.N.slice(10, 12);
    setTimeFormat(str);
  };

  return (
    <div className="FlightInsert">
      <section className="container">
        <div className="formItems">
          <div className="formItem">
            <div>$$ 선택 항공편 $$ </div>
            <div>
              - {airlineNm} - {depAirportNm}공항 출발 - {arrAirportNm}공항 도착
              - {dateFormat} - {timeFormat}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default MyListSelectBox;
