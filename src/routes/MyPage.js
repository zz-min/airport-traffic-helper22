import React from "react";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();

  if (localStorage.getItem("loginValidity") === "false") {
    alert("Login을 먼저 해주세요");
    navigate("/login");
  }

  return <div>MyPage</div>;
}

export default MyPage;
