import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Map.scss";

const { kakao } = window;

function Map({ btnItemNum, btnItemValue }) {
  //btnItemNum 1)출발지->출발공항 2)도착공항->도착지 3)출발공항근처 실시간 주차장 정보
  const [keyword, setKeyword] = useState();
  const [keywordId, setKeywordId] = useState();
  const [search_loc_xy, setSearch_loc_xy] = useState();
  const [parkingInfo, setParkingInfo] = useState();
  const [parkingInfoList, setParkingInfoList] = useState();
  const labelNm = btnItemNum === 2 ? "도착" : "출발"; //1,2이면 labelNm은 출발지
  // const parkingO = [광주, 군산, 여수, 원주, 제주, 김해, 울산, 김포, 대구, 청주]; //주차장 조회가능한 공항
  const schAirportCode = {
    KWJ: "광주",
    KUV: "군산",
    RSU: "여수",
    WJU: "원주",
    CJU: "제주",
    PUS: "김해",
    USN: "울산",
    GMP: "김포",
    TAE: "대구",
    CJJ: "청주",
  }; //주차장 조회가능한 공항
  const parkingNo = ["무안", "양양", "사천", "인천", "포항"]; //조회불가 공항 :

  useEffect(() => {
    console.log(btnItemNum); //기본 1 (출발지선택)
    console.log("btnItemValue1 >>" + btnItemValue); //기본 undifined
    console.log(btnItemValue); //기본 undifined

    makeMap(btnItemValue);
  }, [btnItemValue, btnItemNum, keyword]);

  const makeMap = async (btnItemValue_) => {
    //33.450701, 126.570667 -
    const container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), //기본값
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);
    var xy_, xy_2;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (btnItemNum === 1) {
      if (keyword === undefined) {
        //키워드없을떄 기본 출발공항만 Map에 띄우기
        await search_loc(btnItemValue_[0] + "공항").then((data) => {
          xy_ = data;
        });
        console.log(xy_);
        //초점변경
        options = {
          center: new kakao.maps.LatLng(xy_[0], xy_[1]),
          level: 3,
        };
        map = new kakao.maps.Map(container, options);
        // 마커를 생성합니다
        var markerPosition = new kakao.maps.LatLng(xy_[0], xy_[1]);
        var marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map); // 마커가 지도 위에 표시
      } else {
        //키워드있을 때 출발공항과 출발지 같이 Map에 띄우기
        await search_loc(btnItemValue_[0] + "공항").then((data) => {
          console.log(data);
          xy_ = data;
        });
        await search_loc(keyword).then((data) => {
          console.log(data);
          xy_2 = data;
        });
        //초점변경
        var points = [
          new kakao.maps.LatLng(xy_[0], xy_[1]),
          new kakao.maps.LatLng(xy_2[0], xy_2[1]),
        ];
        var bounds = new kakao.maps.LatLngBounds();
        // 마커를 생성합니다
        for (var i = 0; i < points.length; i++) {
          var marker = new kakao.maps.Marker({
            position: points[i],
          });
          marker.setMap(map); // 마커가 지도 위에 표시
          bounds.extend(points[i]);
        }
        map.setBounds(bounds);
      }
      map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); //교통상황라인표시
    } else if (btnItemNum === 2) {
      if (keyword === undefined) {
        //키워드없을떄 기본 도착공항만 Map에 띄우기
        //도착공항지정
        await search_loc(btnItemValue_[1] + "공항").then((data) => {
          xy_ = data;
        });
        console.log(xy_);
        //초점변경
        options = {
          center: new kakao.maps.LatLng(xy_[0], xy_[1]),
          level: 3,
        };
        map = new kakao.maps.Map(container, options);
        // 마커를 생성합니다
        var markerPosition = new kakao.maps.LatLng(xy_[0], xy_[1]);
        var marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map); // 마커가 지도 위에 표시
      } else {
        //키워드있을 때 도착공항과 도착지같이 Map에 띄우기
        await search_loc(btnItemValue_[1] + "공항").then((data) => {
          console.log(data);
          xy_ = data;
        });
        await search_loc(keyword).then((data) => {
          console.log(data);
          xy_2 = data;
        });
        //초점변경
        var points = [
          new kakao.maps.LatLng(xy_[0], xy_[1]),
          new kakao.maps.LatLng(xy_2[0], xy_2[1]),
        ];
        var bounds = new kakao.maps.LatLngBounds();
        // 마커를 생성합니다
        for (var i = 0; i < points.length; i++) {
          var marker = new kakao.maps.Marker({
            position: points[i],
          });
          marker.setMap(map); // 마커가 지도 위에 표시
          bounds.extend(points[i]);
        }
        map.setBounds(bounds);
      }
      map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); //교통상황라인표시
    } else if (btnItemNum === 3) {
      alert("3번버튼 진입");
      //주차장이 있는 공항인지 여부 확인하기
      //if (parkingNo.includes(btnItemValue_[0])) {
      console.log("dddddddddddddddddddddddddddddddddddddddddddd");
      console.log(Object.keys(schAirportCode));
      console.log(btnItemValue_[0]);
      if (Object.values(schAirportCode).includes(btnItemValue_[0])) {
        var schAirportCodeID = Object.keys(schAirportCode).find(
          (key) => schAirportCode[key] === btnItemValue_[0]
        );
        const r = await axios.get(
          `http://openapi.airport.co.kr/service/rest/AirportParking/airportparkingRT?serviceKey=fhy41313p5usuDFdab0hFuBpAm0r2ByZwbHyFOFtRnOVjvXRYSJVdLJ64xx7FFryhq3fk9%2B6fuiLaBaoF9EZqg%3D%3D&schAirportCode=${schAirportCodeID}`
        );
        console.log(r);
        var list = r.data.response.body.items.item;
        var parkingInfoList = new Array();
        console.log(list.length + "개 주차장 리스트 존재");
        list.forEach((element) => {
          var data = new Object();
          data.parkingNm = element.parkingAirportCodeName;
          data.parkingFullSpace = element.parkingFullSpace;
          data.parkingIstay = element.parkingIstay;
          var a = (data.parkingIstay / data.parkingFullSpace) * 100;
          data.parkingCongestionDegree = a.toFixed(2);

          parkingInfoList.push(data);
        });
        await setParkingInfo(parkingInfoList);

        console.log(parkingInfoList);
        console.log(parkingInfoList[0]);
        console.log(parkingInfoList[0].parkingNm);
      } else {
        //실시간 주차장정보X
        alert("주차장정보가 없는 공항입니다. 해당기능이용불가");
        //["무안", "양양", "사천", "인천", "포항"]
      }
    }
  };
  const btn3Rendering = () => {
    const result = [];
    var k = parkingInfo.length;
    for (var i = 0; i < k; i++) {
      <div>parkingInfo[i].parkingNm</div>;
    }
    return result;
  };

  const search_loc = async (keyword_) => {
    //keyword로 가장 관련도 높은 장소를 추출해내기
    console.log(keyword_ + "위치검색중");
    const r = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query='${keyword_}'`,
      {
        headers: {
          Authorization: "KakaoAK 2a37f23570f77d6e02a9616547f74a05",
        },
      }
    );

    var xy = [r.data.documents[0].y, r.data.documents[0].x];
    console.log(xy);
    setSearch_loc_xy(xy);
    return xy;
  };
  //주차장 조회가능한 공항:광주 군산 여수 원주 제주 김해 울산 김포 대구 청주
  //조회불가 공항 : 무안 양양 사천 인천 포항

  return (
    <>
      {btnItemNum === 3 ? (
        <div className="inputBox">{/* {btn3Rendering()} */}</div>
      ) : (
        <div className="inputBox">
          {/* <div>{btnItemNum}</div> */}
          <div className="labelBox1">
            <label>
              {labelNm}지 &lt; - &gt;{" "}
              {btnItemValue != undefined
                ? btnItemValue[btnItemNum - 1]
                : labelNm}
              공항
            </label>
          </div>
          <div className="labelBox1">
            <label>{labelNm}지를 키워드로 입력하세요 :</label>
            <input
              type="text"
              onChange={(event) => setKeyword(event.target.value)}
              className="keywordInput"
            ></input>
            <button type="button" onClick={() => {}}>
              조회하기
            </button>
          </div>
        </div>
      )}
      <div className="mapBox">
        <div id="map" style={{ width: "650px", height: "500px" }}></div>
      </div>
    </>
  );
}
//search_loc({ keyword })
export default Map;
