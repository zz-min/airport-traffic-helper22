import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./MyListSelectBox.scss";

const MyListSelectBox = ({ selectIndex }) => {
  const [index, setIndex] = useState();
  const [airlineNm, setAirlineNm] = useState();
  const [arrAirportNm, setArrAirportNm] = useState();
  const [depPlandTime, setDepPlandTime] = useState();
  const [depAirportNm, setDepAirportNm] = useState();
  const [dateFormat, setDateFormat] = useState();
  const [timeFormat, setTimeFormat] = useState();
  useEffect(() => {
    setting();
  }, [selectIndex]);

  const setting = async () => {
    const r = await axios.get(
      `https://ts0xq3oxy8.execute-api.ap-northeast-2.amazonaws.com/index/${selectIndex}`
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
      depPlandTime.slice(0, 4) +
      "/" +
      depPlandTime.slice(4, 6) +
      "/" +
      depPlandTime.slice(6, 8);
    setDateFormat(str);
    str = depPlandTime.slice(8, 10) + ":" + depPlandTime.slice(10, 12);
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
              -{dateFormat}
              {timeFormat}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default MyListSelectBox;
