import React, { useEffect, useState } from "react";
import axios from "axios";
import Map from "./Map";

const { kakao } = window;

function MyPage() {
  const [keyword, setKeyword] = useState();
  const [keywordId, setKeywordId] = useState();

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);
    var markerPosition = new kakao.maps.LatLng(
      37.365264512305174,
      127.10676860117488
    );
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);

  const search_loc = async () => {
    const r = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query='${keyword}')`,
      {
        headers: {
          Authorization: "KakaoAK 2a37f23570f77d6e02a9616547f74a05",
        },
      }
    );
    console.log(r);
    console.log(r.data);
    console.log(r.data.document);
    console.log(r.data.document[0]);
    setKeywordId(r.data[0]);
    //alert(keywordId);
  };

  return (
    <>
      <Map>MyPage</Map>
      <label>출발지선택</label>
      <input
        type="text"
        onChange={(event) => setKeyword(event.target.value)}
      ></input>
      <button type="button" onClick={search_loc}>
        조회하기
      </button>
      <div id="map" style={{ width: "500px", height: "500px" }}></div>{" "}
    </>
  );
}

export default MyPage;
