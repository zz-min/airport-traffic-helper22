import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <Link to="/main">Home</Link>
      <Link to="/MyPage">MyPage</Link>
    </div>
  );
}

export default Navigation;
