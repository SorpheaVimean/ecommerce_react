import { Header } from "antd/es/layout/layout";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../img/logo.png";
const LoginAndSigninLayout = () => {
  return (
    <div>
      <Header className="flex items-center">
        <Link to={"/"}>
          <img alt="logo" src={logo} className="w-9 lg:w-11 cursor-pointer " />
        </Link>
      </Header>
      <Outlet />
    </div>
  );
};

export default LoginAndSigninLayout;
