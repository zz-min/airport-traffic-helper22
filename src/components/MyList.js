import React, { useCallback, useEffect, useState } from "react";
import MyListItem from "./MyListItem";
import "./MyList.scss";

const MyList = ({ myList, onClick }) => {
  const onClick_ = useCallback(async (str) => {
    //str : 선택된 항목의 인덱스값
    onClick(str);
  }, []);
  return (
    <div className="MyList">
      {myList.map((myList_) => (
        <MyListItem myList_={myList_} key={myList_[0]} onClick_={onClick_} />
      ))}
    </div>
  );
};
export default MyList;
