import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import FlightTemplate from "../components/FlightTemplate";
import FlightInsert from "../components/FlightInsert";
import FlightList from "../components/FlightList";
import "./Main.css";

function Main() {
  
  const [flightList, setFlightList] = useState([{
    vihicleId:'5',
    arrPlandTime:'d',
    depPlandTime:'d'
  },
  {
    vihicleId:'6',
    arrPlandTime:'d',
    depPlandTime:'d'
  }]);

  const onInsert=useCallback(async(text)=>{
    console.log(flightList);
    console.log("main함수 //"+text);

    const r = await axios.get(`https://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList?serviceKey=fhy41313p5usuDFdab0hFuBpAm0r2ByZwbHyFOFtRnOVjvXRYSJVdLJ64xx7FFryhq3fk9%2B6fuiLaBaoF9EZqg%3D%3D&pageNo=1&numOfRows=10&_type=json&depAirportId=${text[2]}&arrAirportId=${text[3]}&depPlandTime=${text[0]}&airlineId=${text[1]}`);
    console.log(`https://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList?serviceKey=fhy41313p5usuDFdab0hFuBpAm0r2ByZwbHyFOFtRnOVjvXRYSJVdLJ64xx7FFryhq3fk9%2B6fuiLaBaoF9EZqg%3D%3D&pageNo=1&numOfRows=10&_type=json&depAirportId=${text[2]}&arrAirportId=${text[3]}&depPlandTime=${text[0]}&airlineId=${text[1]}`);
    console.log("main함수axios결과//"+r.data.response.body.items.item);
    const list=r.data.response.body.items.item;
    console.log("d >> "+list);
    list.map((item)=>{
      const set={
        vihicleId:item.vihicleId,
        arrPlandTime:item.arrPlandTime,
         depPlandTime:item.depPlandTime
      }
      setFlightList(flightList.concat(set));
    },[flightList]);

    flightList.map(flight=>(  console.log("a >>"+flight.vihicleId)));
  
    //r.data.response.body.items.item-arrPlandTime,depPlandTime(202012011120),OZ8141
    //var flightList=r.data.response.body.items.item;
    //alert(text);
  })

  //TEST DATA : 20201201,아시아나(AAR),광주출발(NAARKJJ),제주도착(NAARKPC) 
  return (
    <>
    <FlightTemplate>
      <FlightInsert onInsert={onInsert}></FlightInsert>
     {/*  <FlightList flight={flightList}></FlightList> */}
    </FlightTemplate>
    </>
  );
}

export default Main;
