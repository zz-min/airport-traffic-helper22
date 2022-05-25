import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Main from "./routes/Main";
import MyPage from "./routes/MyPage";
import Navigation from "./components/Navigation";

var loginValidity = localStorage.getItem("loginValidity");
//var path = loginValidity === "true" ? <Main /> : <Home />;
//{ loginValidity } === "true" ? <Main /> :
function App() {
  return (
    <HashRouter>
      <Navigation />
      <Routes>
        <Route
          path="/*"
          element={loginValidity === "true" ? <Main /> : <Home />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
        <Route path="/myPage" element={<MyPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
