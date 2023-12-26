import React from "react";
import { Button } from "../buttons/Buttons";
import logo from "../../img/logo.png";
import Search from "antd/es/input/Search";
const Header = () => {
  const handlePrimaryClick = () => {
    console.log("Primary button clicked");
    // Add your primary button click logic here
  };

  const handleSecondaryClick = () => {
    console.log("Secondary button clicked");
    // Add your secondary button click logic here
  };
  const onSearch = (event) => {
    alert(event);
  };
  return (
    <>
      <div className="bg-Footer h-20 ">
        <div className="container flex bg-none justify-between w-full">
          <div>
            <img src={logo} className="w-[41px] h-[42px]" />
          </div>
          <div>
            <Search placeholder="Search by name..." onSearch={onSearch} />
          </div>
          <div>
            <div>Hello</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
