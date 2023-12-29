import React from "react";
// import { Button } from "../buttons/Buttons";
import logo from "../../img/logo.png";
import Search from "antd/es/input/Search";
import { AudioOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

const Header = () => {
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );
  const handlePrimaryClick = () => {
    console.log("Primary button clicked");
    // Add your 70px;ry button click logic here
  };

  const handleSecondaryClick = () => {
    console.log("Secondary button clicked");
    // Add your secondary button click logic here
  };
  const onSearch = (value) => console.log(value);
  return (
    <div className="bg-Backproducts h-20 flex items-center ">
      <div className="flex justify-between items-center w-full mx-[20px] xs:mx-[30px] xl:mx-[70px] ">
        <div>
          <img alt="logo" src={logo} className="w-9 " />
        </div>
        <div>
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            className="w-40 xs:w-96 "
          />
        </div>
        <div>
          <Space>
            <button className="w-18 h-10 px-4 text-black rounded-lg hover:shadow-2xl justify-center items-center gap-2 inline-flex hover:bg-gray-200 hover:border-gray-400 transition duration-300">
              Log In
            </button>
            <button className="w-18 h-10 px-4 text-sm text-white bg-neutral-800 rounded-lg shadow-2xl justify-center items-center inline-flex hover:bg-neutral-600 transition duration-200">
              Sign Up
            </button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Header;
