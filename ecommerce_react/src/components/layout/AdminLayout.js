import React, { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, Avatar } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const onLinkPage = (routeName) => {
    // use for link to other page
    navigate(routeName); // /category , /login
  };
  //Logout
  const onLogOut = () => {
    localStorage.setItem("isLogin", null);
    window.location.href = "/LoginPage";
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  // Siderbar menu
  const sidebar = [
    {
      key: "1",
      icon: <MdOutlineDashboard />,
      label: "DashBoard",
      onClick: () => onLinkPage("DashBoard"),
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "nav 2",
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "nav 3",
    },
  ];
  // dropdow of profile
  const items = [
    {
      label: <button type="button">Profile</button>,
      key: "0",
      onClick: () => onLinkPage("/ProfilePage"),
    },
    {
      type: "divider",
    },
    {
      label: (
        <button type="button" onClick={showModal}>
          Reset password
        </button>
      ),
      key: "1",
    },
    {
      label: (
        <button type="button" onClick={onLogOut}>
          <LogoutOutlined /> LogOut
        </button>
      ),
      key: "3",
    },
  ];
  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            color: "white",
          }}
        />
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={sidebar}
        />
      </Sider>
      <Layout className="transform duration-200"
     
        style={{
          marginLeft: collapsed ? "80px" : "200px",
        }}>
        <Header className="  p-0 bg-gray-200 flex justify-between items-center px-10 sticky top-0 z-10 shadow-lg">
          <p className="font-bold text-2xl">title</p>
          <div className="flex justify-center items-center gap-5">
            {/* <p>{user.lastName + " " + user.firstName}</p> */}

            <Dropdown
              className="flex float-right"
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Avatar icon={<UserOutlined />} />
                {/* {user.profile === null ? (
              <Avatar icon={<UserOutlined />} />
            ) : (
              <img
                className="border-2 border-blue-gray-400 rounded-full object-fill w-10"
                src={configImage.image_path + user.profile}
                alt="User Profile"
              />
            )} */}
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
