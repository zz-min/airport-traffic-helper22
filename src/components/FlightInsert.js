import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./FlightInsert.css";

const FlightInsert = ({ onInsert }) => {
  const [isLoading, setIsLoading] = useState("true");
  const [isLoading2, setIsLoading2] = useState("true");
  const [airlineList, setAirlineList] = useState();
  const [airportList, setAirportList] = useState();

  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();
  const [value4, setValue4] = useState();

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

  const onChange1 = useCallback((e) => {
    setValue1(e.target.value); //console.log(e.target.value);
  }, []);

  const onChange2 = useCallback((e) => {
    setValue2(e.target.value); //console.log("setValue2" + e.target.value);
  }, []);

  const onChange3 = useCallback(async (e) => {
    setValue3(e.target.value); //console.log(e.target.value);
  }, []);

  const onChange4 = useCallback((e) => {
    setValue4(e.target.value); //console.log(e.target.value);
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      console.log("submit진입");
      var value2_, value3_, value4_;
      airlineList.map((item) => {
        if (item.airlineNm === value2) value2_ = item.airlineId;
      });
      airportList.map((item) => {
        if (item.airportNm === value3) {
          value3_ = item.airportId;
        } else if (item.airportNm === value4) {
          value4_ = item.airportId;
        }
      });

      //출발날짜 , 항공사 , 출발공항 , 도착공항
      var str = [value1, value2_, value3_, value4_];
      console.log(str);
      onInsert(str);

      e.preventDefault();
    },
    [onInsert, value1, value2, value3, value4]
  );

  return (
    <div className="FlightInsert">
      <section className="container">
        {isLoading || isLoading2 ? (
          <div className="loader__text">
            <span>Loading...</span>
          </div>
        ) : (
          <form id="serchFlightForm" onSubmit={onSubmit}>
            <div className="formItems">
              <div className="formItem">
                <label>출발날짜 : </label>
                <input
                  type="text"
                  id="input-date"
                  placeholder="20220524 형식"
                  onChange={onChange1}
                ></input>
              </div>
              <div className="formItem">
                <label> 항공사ㅤ: </label>

                <select
                  id="input-airline"
                  className="checkedserchFlight"
                  onChange={onChange2}
                >
                  <option value="none">=== (필수) === </option>
                  {airlineList.map((airline) => {
                    return (
                      <option value={airline.airlineNm} key={airline.airlineId}>
                        {airline.airlineNm}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="formItems">
              <div className="formItem">
                <label>출발공항 : </label>
                <select
                  id="input-depAirport"
                  className="checkedserchFlight"
                  required="required"
                  onChange={onChange3}
                >
                  <option value="none">=== (필수) === </option>
                  {airportList.map((airport) => {
                    return (
                      <option
                        value={airport.airportNm}
                        key={airport.airportId + "Dep"}
                      >
                        {airport.airportNm}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="formItem">
                <label>도착공항 : </label>
                <select
                  id="input-arrAirport"
                  className="checkedserchFlight"
                  required="required"
                  onChange={onChange4}
                >
                  <option value="none">=== (필수) === </option>
                  {airportList.map((airport) => {
                    return (
                      <option
                        value={airport.airportNm}
                        key={airport.airportId + "Arr"}
                      >
                        {airport.airportNm}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="formItems">
              <button type="submit" id="btnSubmit_flight">
                조회하기
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
export default FlightInsert;
