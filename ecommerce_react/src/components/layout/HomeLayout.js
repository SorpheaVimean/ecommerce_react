import React from "react";
import Headers from "../header/Headers";
import Navbar from "../navbar/Navbar";
import {  Outlet } from "react-router-dom";
import { Layout, Menu, theme, FloatButton } from "antd";
import {
  UserOutlined,
  CommentOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { FiSend } from "react-icons/fi";
const { Header, Content, Footer } = Layout;

const HomeLayout = () => {
  // Check if theme.useToken() is truthy before accessing its properties
  const token = theme.useToken() || {};

  const itemsNavbar = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Home",
      to: "/",
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Order",
      to: "/order",
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: "Context",
      to: "/context",
    },
  ];

  return (
    <div>
      <Layout>
        <Header className="p-0">
          <Headers />
        </Header>
        {/* <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            {itemsNavbar.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.to}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Header> */}
        <Navbar />
        <Content>
          <Outlet />
        </Content>
        {/* <Footer>Footer</Footer> */}
      </Layout>
      <FloatButton.Group
        trigger="click"
        type="primary"
        className=" mr-[20px] xs:mr-[30px]"
        icon={<FiSend />}
      >
        
        <FloatButton icon={<CommentOutlined />} />
        <FloatButton icon={<CustomerServiceOutlined />} />
        <FloatButton  />
      </FloatButton.Group>
      <FloatButton.BackTop />
      
    </div>
  );
};

export default HomeLayout;
