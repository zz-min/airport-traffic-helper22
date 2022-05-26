import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Map from "../components/Map";
import MyList from "../components/MyList";

const { kakao } = window;

function MyPage() {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    testFunc();
  }, []);

  const testFunc = async () => {
    var id = localStorage.getItem("id");
    const r = await axios.get(
      `https://ts0xq3oxy8.execute-api.ap-northeast-2.amazonaws.com/items/${id}`
    );
    setMyList(r.data.Items);
    myList.forEach((t) => {
      var ap = t.home;
      console.log(t);
      console.log(ap.S);
    });
  };

  return (
    <>
      <div>
        <button type="button" onClick={testFunc}>
          testFunc
        </button>
      </div>
      {/* <MyList myList={myList}></MyList> */}
      <Map>MyPage</Map>
    </>
  );
}

export default MyPage;
