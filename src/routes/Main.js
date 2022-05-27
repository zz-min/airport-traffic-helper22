import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import FlightTemplate from "../components/FlightTemplate";
import FlightInsert from "../components/FlightInsert";
import FlightList from "../components/FlightList";
import "./Main.css";

function Main() {
  const [flightList, setFlightList] = useState([]);

  const onInsert = useCallback(
    async (text) => {
      const r = await axios.get(
        `https://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList?serviceKey=fhy41313p5usuDFdab0hFuBpAm0r2ByZwbHyFOFtRnOVjvXRYSJVdLJ64xx7FFryhq3fk9%2B6fuiLaBaoF9EZqg%3D%3D&pageNo=1&numOfRows=10&_type=json&depAirportId=${text[2]}&arrAirportId=${text[3]}&depPlandTime=${text[0]}&airlineId=${text[1]}`
      );
      console.log(
        `https://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList?serviceKey=fhy41313p5usuDFdab0hFuBpAm0r2ByZwbHyFOFtRnOVjvXRYSJVdLJ64xx7FFryhq3fk9%2B6fuiLaBaoF9EZqg%3D%3D&pageNo=1&numOfRows=10&_type=json&depAirportId=${text[2]}&arrAirportId=${text[3]}&depPlandTime=${text[0]}&airlineId=${text[1]}`
      );

      const list = r.data.response.body.items.item;
      var list_ = [];

      list.forEach((item) => {
        var arrPlandTime_ =
          item.arrPlandTime.toString(10).substr(8, 2) +
          " : " +
          item.arrPlandTime.toString(10).substr(10, 2);
        var depPlandTime_ =
          item.depPlandTime.toString(10).substr(8, 2) +
          " : " +
          item.depPlandTime.toString(10).substr(10, 2);

        const set = [
          item.airlineNm,
          item.depAirportNm,
          item.arrAirportNm,
          item.vihicleId,
          item.depPlandTime,
          arrPlandTime_,
          depPlandTime_,
        ];
        list_.push(set);
      });

      await setFlightList([...list_]);
    },
    [flightList]
  );

  return (
    <>
      <FlightTemplate>
        <FlightInsert onInsert={onInsert}></FlightInsert>
        <FlightList flightList={flightList} key="flightList"></FlightList>
      </FlightTemplate>
    </>
  );
}

export default Main;
