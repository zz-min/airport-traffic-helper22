import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Map.scss";

const { kakao } = window;

function Map({ btnItemNum, btnItemValue }) {
  //btnItemNum 1)출발지->출발공항 2)도착공항->도착지 3)출발공항근처 실시간 주차장 정보
  const [keyword, setKeyword] = useState();
  const [keywordId, setKeywordId] = useState();
  const [search_loc_xy, setSearch_loc_xy] = useState();
  const labelNm = btnItemNum === 1 ? "출발지" : "도착지";

  useEffect(() => {
    console.log(btnItemNum); //기본 1 (출발지선택)
    console.log("btnItemValue1 >>" + btnItemValue); //기본 undifined
    //btnItemValue === undefined ? makeMap() : makeMap2();
    makeMap1(btnItemValue);
    //makeMap1(btnItemValue);
  }, [btnItemValue, btnItemNum, keyword]);

  const makeMap1 = async (btnItemValue_) => {
    //33.450701, 126.570667 -
    const container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), //기본값
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);
    var xy_, xy_2;
    if (keyword !== undefined) {
      /////////////////////////////////////////////////////////////
      console.log("keyword조건문");

      if (btnItemNum === 1) {
        //출발공항지정
        await search_loc(btnItemValue_[0] + "공항").then((data) => {
          console.log(data);
          xy_ = data;
        });
        await search_loc(keyword).then((data) => {
          console.log(data);
          xy_2 = data;
        });
        console.log("출발공항좌표" + xy_);
        console.log("출발지 키워드 좌표" + xy_2);
      } else if (btnItemNum === 2) {
        //도착공항지정
        await search_loc(btnItemValue_[1] + "공항").then((data) => {
          console.log(data);
          xy_ = data;
        });
        await search_loc(keyword).then((data) => {
          console.log(data);
          xy_2 = data;
        });
        console.log("도착공항좌표" + xy_);
        console.log("도착지 키워드 좌표" + xy_2);
      }
      //공통
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
      map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); //교통상황라인표시
    } else if (btnItemValue_ !== undefined) {
      /////////////////////////////////////////////////////////////
      console.log("btnItemValue_조건문");
      console.log(btnItemValue_);

      if (btnItemNum === 1) {
        //출발공항지정
        await search_loc(btnItemValue_[0] + "공항").then((data) => {
          console.log(data);
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
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); //교통상황라인표시
      } else if (btnItemNum === 2) {
        //도착공항지정
        await search_loc(btnItemValue_[1] + "공항").then((data) => {
          console.log(data);
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
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); //교통상황라인표시
      }
    }
    // 마커를 생성합니다
    /* var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map); // 마커가 지도 위에 표시되도록 설정합니다
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); */
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
    console.log(r.data.documents[0]);
    console.log(r.data.documents[0].id);
    console.log(r.data.documents[0].x);
    console.log(r.data.documents[0].y);
    console.log(r.data.documents[0].place_name);
    var xy = [r.data.documents[0].y, r.data.documents[0].x];
    console.log(xy);
    setSearch_loc_xy(xy);
    return xy;
    //makeMap1(r.data.documents[0].y, r.data.documents[0].x);
    /* r.data.documents.forEach((t) => {
      console.log(t.id);
      console.log(t.place_name);
    }); */
  };

  return (
    <>
      {btnItemNum === 3 ? (
        <div>3번</div>
      ) : (
        <div className="inputBox">
          {/* <div>{btnItemNum}</div> */}
          <label>
            {btnItemNum}//{labelNm}를 키워드로 입력하세요 :{btnItemValue}
          </label>
          <input
            type="text"
            onChange={(event) => setKeyword(event.target.value)}
            className="kewordInput"
          ></input>
          <button type="button" onClick={() => {}}>
            조회하기
          </button>
        </div>
      )}

      <div id="map" style={{ width: "500px", height: "500px" }}></div>
    </>
  );
}
//search_loc({ keyword })
export default Map;
