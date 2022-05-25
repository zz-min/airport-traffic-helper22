import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="black-nav">
      <div id="title-box">airport-traffic-helper22</div>
      <div id="item-box">
      <Link to="/main"><div className="item">Homed</div></Link>
      <Link to="/MyPage"><div className="item">MyPage</div></Link>
      </div>
    </div>
  );
}

export default Navigation;
