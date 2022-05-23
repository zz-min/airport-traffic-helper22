import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserPool from "../libs/UserPool";

function SignUp() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    UserPool.signUp(id, password, [], null, (err, data) => {
      if (err) {
        console.log(err);
        console.log("에러");
      }
      console.log("NO에러");
      console.log(data);
      navigate("/login");
    });
  };
  return (
    <div>
      <h1>회원가입 해주세요</h1>
      <div className="inputBox">
        <form onSubmit={onSubmit}>
          <span>ID : </span>
          <input
            value={id}
            placeholder="id를 입력해주세요"
            onChange={(event) => {
              setId(event.target.value);
            }}
          ></input>
          <br></br>
          <span>PWD : </span>
          <input
            value={password}
            placeholder="비밀번호를 입력해주세요"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div>
        <button>Click</button>
      </div>
    </div>
  );
}

export default SignUp;
