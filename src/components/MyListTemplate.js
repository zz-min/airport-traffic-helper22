import React from "react";
import "./MyListTemplate.scss";

const MyListTemplate = ({ children }) => {
  return (
    <div className="MyListTemplate">
      <div className="title">조회할 항공편을 선택해주세요</div>
      <div className="content">{children}</div>
    </div>
  );
};
export default MyListTemplate;
