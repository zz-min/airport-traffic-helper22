import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Link to={{ pathname: "/login" }}>
      <h1>welcome</h1>
      <h3>Go to login</h3>
      <img src={"/img/logo.jpg"} alt={"logo"} />
    </Link>
  );
}

export default Home;
