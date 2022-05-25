import React, { Component } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export class Main extends Component {
  state = {
    isLoading: true,
    airlineList: [],
    airportList: [],
    navigate: "",
  };

  getAirlineList = async () => {
    const r = await axios.get(
      "https://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getAirmanList?serviceKey=fhy41313p5usuDFdab0hFuBpAm0r2ByZwbHyFOFtRnOVjvXRYSJVdLJ64xx7FFryhq3fk9%2B6fuiLaBaoF9EZqg%3D%3D&_type=json"
    );
    this.setState({
      airlineList: r.data.response.body.items.item,
      isLoading: false,
    });
  };

  getAirportList = async () => {
    const r = await axios.get(
      "https://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getArprtList?serviceKey=fhy41313p5usuDFdab0hFuBpAm0r2ByZwbHyFOFtRnOVjvXRYSJVdLJ64xx7FFryhq3fk9%2B6fuiLaBaoF9EZqg%3D%3D&_type=json"
    );
    this.setState({
      airportList: r.data.response.body.items.item,
      isLoading: false,
    });
  };

  componentDidMount() {
    this.getAirlineList();
    this.getAirportList();
    this.navigate = useNavigate();
  }
  onSubmit_flight = (event) => {
    console.log("앙성공");
    //this.navigate("/MyPage");
  };

  render() {
    const { isLoading, airportList, airlineList } = this.state;

    if (localStorage.getItem("loginValidity") === "false") {
      alert("Login을 먼저 해주세요");
      //this.navigate("/login");
    }

    return (
      <>
        <section className="container">
          {isLoading ? (
            <div className="loader__text">
              <span>Loading...</span>
            </div>
          ) : (
            <form id="serchFlightForm" onSubmit={this.onSubmit_flight}>
              <label>항공사 : </label>
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
}

export default Main;