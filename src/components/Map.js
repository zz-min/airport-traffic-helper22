import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Map.scss";

const { kakao } = window;

function Map({ btnItemNum, btnItemValue }) {
  //btnItemNum 1)출발지->출발공항 2)도착공항->도착지 3)출발공항근처 실시간 주차장 정보
  const [keyword, setKeyword] = useState();
  const [keywordId, setKeywordId] = useState();
  const labelNm = btnItemNum === 1 ? "출발지" : "도착지";

  const makeMap = (x, y) => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(x, y),
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);
    var markerPosition = new kakao.maps.LatLng(x, y);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map); // 마커가 지도 위에 표시되도록 설정합니다
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
  };

  const search_loc = async () => {
    //keyword로 가장 관련도 높은 장소를 추출해내기
    const r = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query='${keyword}')`,
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
    makeMap(r.data.documents[0].y, r.data.documents[0].x);
    /* r.data.documents.forEach((t) => {
      console.log(t.id);
      console.log(t.place_name);
    }); */
  };

  useEffect(() => {
    makeMap(33.450701, 126.570667);
  }, []);

  return (
    <>
      {btnItemNum === 3 ? (
        <div>3번</div>
      ) : (
        <div className="inputBox">
          {/* <div>{btnItemNum}</div> */}
          <label>
            {labelNm}를 키워드로 입력하세요 :{btnItemValue}
          </label>
          <input
            type="text"
            onChange={(event) => setKeyword(event.target.value)}
          ></input>
          <button type="button" onClick={search_loc}>
            조회하기
          </button>
        </div>
      )}

      <div id="map" style={{ width: "500px", height: "500px" }}></div>
    </>
  );
}

export default Map;
