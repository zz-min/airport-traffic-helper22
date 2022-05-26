import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import FlightTemplate from "../components/FlightTemplate";
import FlightInsert from "../components/FlightInsert";
import FlightList from "../components/FlightList";
import "./Main.css";

function Main() {
  const [flightList, setFlightList] = useState([
    /* {
      vihicleId: "",
      arrPlandTime: "",
      depPlandTime: "",
    }, */
  ]);

  const onInsert = useCallback(
    async (text) => {
      setFlightList([""]);
      console.log(flightList);
      console.log("main함수 //" + text);

      const r = await axios.get(
        `https://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList?serviceKey=fhy41313p5usuDFdab0hFuBpAm0r2ByZwbHyFOFtRnOVjvXRYSJVdLJ64xx7FFryhq3fk9%2B6fuiLaBaoF9EZqg%3D%3D&pageNo=1&numOfRows=10&_type=json&depAirportId=${text[2]}&arrAirportId=${text[3]}&depPlandTime=${text[0]}&airlineId=${text[1]}`
      );
      console.log(
        `https://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList?serviceKey=fhy41313p5usuDFdab0hFuBpAm0r2ByZwbHyFOFtRnOVjvXRYSJVdLJ64xx7FFryhq3fk9%2B6fuiLaBaoF9EZqg%3D%3D&pageNo=1&numOfRows=10&_type=json&depAirportId=${text[2]}&arrAirportId=${text[3]}&depPlandTime=${text[0]}&airlineId=${text[1]}`
      );
      console.log("main함수axios결과//" + r.data.response.body.items.item);
      console.log(
        "main함수axios결과2//" +
          r.data.response.body.items.item[1].arrPlandTime +
          "dd" +
          r.data.response.body.items.item[1].arrAirportNm
      );
      const list = r.data.response.body.items.item;
      for (var i = 0; i < list.length; i++) {}
      list.forEach((item) => {
        var arrPlandTime_ =
          item.arrPlandTime.toString(10).substr(8, 2) +
          " : " +
          item.arrPlandTime.toString(10).substr(10, 2);
        var depPlandTime_ =
          item.depPlandTime.toString(10).substr(8, 2) +
          " : " +
          item.depPlandTime.toString(10).substr(10, 2);
        const set = {
          airlineNm: item.airlineNm,
          depAirportNm: item.depAirportNm,
          arrAirportNm: item.arrAirportNm,
          vihicleId: item.vihicleId,
          depTime: item.depPlandTime,
          arrPlandTime: arrPlandTime_,
          depPlandTime: depPlandTime_,
        };
        setFlightList(flightList.concat(set));
        console.log(set);
      });
      /* list.map((item) => {
        console.log(">>>>>" + item.arrPlandTime);
        console.log(
          item.arrPlandTime.toString(10).substr(8, 2) +
            " : " +
            item.arrPlandTime.toString(10).substr(10, 2)
        );
        var arrPlandTime_ =
          item.arrPlandTime.toString(10).substr(8, 2) +
          " : " +
          item.arrPlandTime.toString(10).substr(10, 2);
        var depPlandTime_ =
          item.depPlandTime.toString(10).substr(8, 2) +
          " : " +
          item.depPlandTime.toString(10).substr(10, 2);
        const set = {
          airlineNm: item.airlineNm,
          depAirportNm: item.depAirportNm,
          arrAirportNm: item.arrAirportNm,
          vihicleId: item.vihicleId,
          depTime: item.depPlandTime,
          arrPlandTime: arrPlandTime_,
          depPlandTime: depPlandTime_,
        };
        setFlightList(flightList.concat(set));
        console.log("ㅇㅇ" + item.vihicleId);
      }, []); */

      console.log("flightList >>" + flightList);
      console.log(flightList.length);

      //r.data.response.body.items.item-arrPlandTime,depPlandTime(202012011120),OZ8141
      //var flightList=r.data.response.body.items.item;
      //alert(text);
    },
    [flightList]
  );

  //TEST DATA : 20201201,아시아나(AAR),광주출발(NAARKJJ),제주도착(NAARKPC)
  return (
    <>
      <FlightTemplate>
        <FlightInsert onInsert={onInsert}></FlightInsert>
        <FlightList flightList={flightList}></FlightList>
        {/* <div className="FlightList">
        <FlightListItem flight={flightList} />
        </div> */}
      </FlightTemplate>
    </>
  );
}

export default Main;
