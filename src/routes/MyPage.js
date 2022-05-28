import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import MyListTemplate from "../components/MyListTemplate";
import MyListTemplate2 from "../components/MyListTemplate2";
import MyList from "../components/MyList";
import MyListSelectBox from "../components/MyListSelectBox";
import "./MyPage.scss";

function MyPage() {
  const [myList, setMyList] = useState([]);
  const [selectIndex, setSelectIndex] = useState([]);

  useEffect(() => {
    loading();
  }, []);

  const loading = async () => {
    var id = localStorage.getItem("id");
    const r = await axios.get(
      `https://ts0xq3oxy8.execute-api.ap-northeast-2.amazonaws.com/items/${id}`
    );

    var list_ = [];
    r.data.Items.forEach((item) => {
      var validation_ = item.validation;
      var index = item.index;
      var airlineNm_ = item.airlineNm;
      var depPlandTime_ = item.depPlandTime;
      var depAirportNm_ = item.depAirportNm;
      var arrAirportNm_ = item.arrAirportNm;
      var te = validation_.BOOL;
      //var set = [];
      if (te === true) {
        const set = [
          index.N,
          airlineNm_.S,
          depPlandTime_.N,
          depAirportNm_.S,
          arrAirportNm_.S,
        ];
        //console.log(set);
        list_.push(set);
      }
    });
    /*  console.log("list_함수");
    console.log(list_); */

    await setMyList([...list_]);
    /*     console.log("myList함수");
    console.log(myList); */
  };

  const onClick = useCallback((str) => {
    //str : 선택된 항목의 index값
    setSelectIndex(str);
    console.log("MyPage str>>" + str);
  }, []);

  return (
    <div className="myPage">
      {/* ///////////////////////////////////////////////////// */}
      <div className="myPageLeft">
        <MyListTemplate>
          <MyListSelectBox selectIndex={selectIndex}></MyListSelectBox>
          <MyList myList={myList} onClick={onClick}></MyList>
        </MyListTemplate>
      </div>
      {/* ///////////////////////////////////////////////////// */}
      <div className="myPageRight">
        <MyListTemplate2 selectIndex={selectIndex}></MyListTemplate2>
      </div>
    </div>
  );
}

export default MyPage;
