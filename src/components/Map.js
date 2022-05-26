import React, { useEffect, useState } from "react";
import axios from "axios";

const { kakao } = window;
function Map() {
  const [keyword, setKeyword] = useState();
  const [keywordId, setKeywordId] = useState();
  const makeMap = (x, y) => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(x, y),
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);
    var markerPosition = new kakao.maps.LatLng(x, y);
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
  };
  const search_loc = async () => {
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
      <label>출발장소를 키워드로 입력하세요 : </label>
      <input
        type="text"
        onChange={(event) => setKeyword(event.target.value)}
      ></input>
      <button type="button" onClick={search_loc}>
        조회하기
      </button>
      <div id="map" style={{ width: "500px", height: "500px" }}></div>
    </>
  );
}

export default Map;
