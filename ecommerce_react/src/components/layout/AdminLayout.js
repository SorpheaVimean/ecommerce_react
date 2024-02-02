import React, { useEffect, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Dropdown,
  Avatar,
  Form,
  Input,
  Space,
  Modal,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { configImage, getUser, isLogin, logout } from "../../share/help";
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const user = getUser();
  const [form] = Form.useForm();
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
    logout();
    console.log(isLogin());
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onUpdate = () => {};

  useEffect(() => {
    if (!isLogin()) {
      // mean not login
      window.location.href = "/login";
    }
  }, [isLogin]);

  // if user is not logged yet to show null
  if (!isLogin()) {
    return null;
  }

  // Siderbar menu
  const sidebar = [
    {
      key: "1",
      icon: <MdOutlineDashboard />,
      label: "DashBoard",
      onClick: () => onLinkPage("/admin"),
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Employee",
      onClick: () => onLinkPage("employee"),
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
      <Layout
        className="transform duration-200"
        style={{
          marginLeft: collapsed ? "80px" : "200px",
        }}
      >
        <Header className="  p-0 bg-gray-200 flex justify-between items-center px-10 sticky top-0 z-10 shadow-lg">
          <p className="font-bold text-2xl">title</p>
          <div className="flex justify-center items-center gap-5">
            <p>{user.firstname + " " + user.lastname}</p>

            <Dropdown
              className="flex float-right"
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                
                {user.profile === null ? (
              <Avatar icon={<UserOutlined />} />
            ) : (
              <img
                className="border-2 border-blue-gray-400 rounded-full object-cover  w-10 h-10"
                src={configImage.image_path + user.image}
                alt="User Profile"
              />
            )}
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

      {/* </Modal Change Password> */}
      <Modal
        title="Change Password"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleOk}
          name="controll hooks"
        >
          <Form.Item
            name="Old password"
            label="Old Password"
            allowClear
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="New password"
            label="New Password"
            allowClear
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="Confirm password"
            label="Confirm Password"
            allowClear
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item className="text-right">
            <Space>
              <Button htmlType="button">Clear</Button>
              <Button htmlType="button">Cancel</Button>
              <Button
                htmlType="submit"
                className="bg-blue-700 hover:bg-blue-500"
                onClick={onUpdate}
              >
                Update
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};
export default AdminLayout;
