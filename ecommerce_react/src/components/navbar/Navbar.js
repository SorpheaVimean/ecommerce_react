import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, Button, Menu } from "antd";

import {
  HomeOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { BiSupport } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { RiMenu5Line } from "react-icons/ri";
import "./Navbar.module.css";

const Navbar = () => {
  const items = [
    {
      label: "HOME",
      key: "home",
      icon: (
        <Link to={"/"}>
          {" "}
          <HomeOutlined />
        </Link>
      ),
    },
    {
      label: "PRODUCTS",
      key: "products",
      icon: (
        <Link to={"product"}>
          <ShoppingOutlined />{" "}
        </Link>
      ),
    },
    {
      label: "ABOUT",
      key: "about",
      icon: (
        <Link to={"about"}>
          <UserOutlined />{" "}
        </Link>
      ),
    },
    {
      label: "SUPPORT",
      key: "support",
      icon: (
        <Link to={"support"}>
          {" "}
          <BiSupport />
        </Link>
      ),
    },
    {
      label: "CONTACTS",
      key: "contacts",
      icon: (
        <Link to={"contact"}>
          {" "}
          <FiSend />
        </Link>
      ),
    },
  ];

  const [current, setCurrent] = useState("home");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    onClose();
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="justify-center items-center font-bold bg-transparent  hidden lg:flex border-b-0 "
      />

      {/* Show the "Open" button only on screens smaller than medium */}
      <h1
        className="lg:hidden  md:block flex float-end mr-[20px] xs:mr-[30px] bg-transparent"
        onClick={showDrawer}
      >
        <RiMenu5Line className="text-4xl" />
      </h1>

      <Drawer title={null} placement="right" onClose={onClose} open={open}>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="vertical"
          items={items}
        />
      </Drawer>
      <logo />
    </div>
  );
};

export default Navbar;
