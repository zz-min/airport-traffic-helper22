import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState("true");
  const [isLoading2, setIsLoading2] = useState("true");
  const [airlineList, setAirlineList] = useState();
  const [airportList, setAirportList] = useState();

  const getAirlineList = async () => {
    const r = await axios.get(
      "https://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getAirmanList?serviceKey=fhy41313p5usuDFdab0hFuBpAm0r2ByZwbHyFOFtRnOVjvXRYSJVdLJ64xx7FFryhq3fk9%2B6fuiLaBaoF9EZqg%3D%3D&_type=json"
    );
    setAirlineList(r.data.response.body.items.item);
    setIsLoading(false);
  };

  const getAirportList = async () => {
    const r = await axios.get(
      "https://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getArprtList?serviceKey=fhy41313p5usuDFdab0hFuBpAm0r2ByZwbHyFOFtRnOVjvXRYSJVdLJ64xx7FFryhq3fk9%2B6fuiLaBaoF9EZqg%3D%3D&_type=json"
    );
    setAirportList(r.data.response.body.items.item);
    setIsLoading2(false);
  };

  useEffect(() => {
    getAirlineList();
    getAirportList();
  }, []);

  const onSubmit_flight = async (event) => {
    await axios.get("");
    navigate("/MyPage");
  };

  if (localStorage.getItem("loginValidity") === "false") {
    alert("Login을 먼저 해주세요");
    navigate("/login");
  }

  return (
    <>
      <section className="container">
        {isLoading || isLoading2 ? (
          <div className="loader__text">
            <span>Loading...</span>
          </div>
        ) : (
          <form id="serchFlightForm" onSubmit={onSubmit_flight}>
            <label>항공사: </label>
            <select id="checkedAirline" className="checkedserchFlight">
              <option value="none">=== (필수) === </option>
              {airlineList.map((airline) => {
                return (
                  <option value={airline.airlineNm} key={airline.airlineId}>
                    {airline.airlineNm}
                  </option>
                );
              })}
            </select>
            <label>출발공항 : </label>
            <select
              id="checkedOriginAirport"
              className="checkedserchFlight"
              required="required"
            >
              <option value="none">=== (필수) === </option>
              {airportList.map((airport) => {
                return (
                  <option
                    value={airport.airportNm}
                    key={airport.airportId + "Origin"}
                  >
                    {airport.airportNm}
                  </option>
                );
              })}
            </select>
            <label>도착공항 : </label>
            <select
              id="checkedDestAirport"
              className="checkedserchFlight"
              required="required"
            >
              <option value="none">=== (필수) === </option>
              {airportList.map((airport) => {
                return (
                  <option
                    value={airport.airportNm}
                    key={airport.airportId + "Dest"}
                  >
                    {airport.airportNm}
                  </option>
                );
              })}
            </select>
            <label>출발날짜 : </label>
            <input
              type="text"
              placeholder="20220524 형식으로 입력하세요."
            ></input>
            <button type="submit" id="btnSubmit_flight">
              조회하기
            </button>
          </form>
        )}
      </section>
    </>
  );
}

export default Main;
