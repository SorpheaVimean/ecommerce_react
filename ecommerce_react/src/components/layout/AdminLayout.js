import React, { useEffect, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import logo from "../../img/logo.png";
import {
  VerticalLeftOutlined,
  VerticalRightOutlined,
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
  message,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { configImage, getUser, isLogin, logout, isPersmission, } from "../../share/help";
import { request } from "../../share/request";
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const user = getUser();
  const [form] = Form.useForm();
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);




  useEffect(() => {

    if (!isLogin()) {
      // mean not login
      window.location.href = "/login";
    }
  }, [isLogin]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const onLinkPage = (routeName) => {
    // use for link to other page
    navigate(routeName); // /category , /login
  };
  
  const sidebar = [
    {
      key: "1",
      icon: <MdOutlineDashboard />,
      label: "DashBoard",
      onClick: () => onLinkPage("/admin"),
    },
    isPersmission("employee.Read") ? // Check if permission is granted
    { // If granted, include this object
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Employee",
      onClick: () => onLinkPage("employee"),
    } : {}, // If not granted, include null
    {
      key: "Customer",
      icon: <UploadOutlined />,
      label: "Customers",
      
      children: [
        { key: "3", label: "List Customers", onClick: () => onLinkPage("customer")},
        { key: "4", label: "Customer Address", onClick: () => onLinkPage("customerAddress")},
      ]
    },
    {
      key: "product",
      icon: <UploadOutlined />,
      label: "Products", 
      children: [
        { key: "5", label: "List Products",  onClick: () => onLinkPage("product"),},
        { key: "6", label: "Brands", onClick: () => onLinkPage("brand")},
        { key: "7", label: "Categories", onClick: () => onLinkPage("category")},
      ]
    },
    {
      key: "Roles",
      icon: <UserOutlined />,
      label: "Role",
      children: [
        { key: "8", label: "List Roles", onClick: () => onLinkPage("role") },
        { key: "9", label: "Role Permission", onClick: () => onLinkPage("rolePermission") },
        { key: "10", label: "Permission", onClick: () => onLinkPage("permission") },
      ],
    },
    {
      key: "Orders",
      icon: <UserOutlined />,
      label: "Orders",
      children: [
        { key: "11", label: "List Orders", onClick: () => onLinkPage("order") },
        { key: "12", label: "Order Status", onClick: () => onLinkPage("orderStatus") },
        { key: "13", label: "Payment Menthod", onClick: () => onLinkPage("paymentmethod") },
      ],
    },
  ];
// Filter out null or empty objects
const filteredSidebar = sidebar.filter(item => item !== null && Object.keys(item).length !== 0);
  const [title, setTitle] = useState(sidebar[0].label);

  //Logout
  const onLogOut = () => {
    logout();
    console.log(isLogin());
    window.location.href = "/login"
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const onClear = () => {
    form.resetFields();
  };

  const onCancel = () => {
    setIsModalOpen(false);
    onClear();
  };
  const onUpdate = async (value) => {
    // Extracting form values
    const params = {
      id: user.id,
      email: user.email,
      oldPassword: value.oldPassword,
      newPassword: value.newPassword,
      confirmPassword: value.confirmPassword,
    };
      const res = await request("employee/setPassword", "POST", params);
      if (res) {
        message.success(res.message);
        onCancel();
      }
  };
  
  



  // if user is not logged yet to show null
  if (!isLogin()) {
    return null;
  }

  // dropdown of profile
  const items = [
    {
      label: "Profile", // Wrap the button element in a span
      key: "0",
      onClick: () => onLinkPage("/admin/profile"),
    },
    {
      type: "divider",
    },
    {
      // Wrap the button element in a span
      label: <span>Reset password</span>,
      key: "1",
      onClick: showModal,
    },
    {
      label: (
        <span>
          {" "}
          {/* Wrap the button element in a span */}
          <LogoutOutlined /> LogOut
        </span>
      ),
      key: "3",
      onClick: onLogOut,
    },
  ];
// change title
  const handleChangeTitle = (e) => {
    const menuItem = sidebar.find((item) => {
      if (item.key === e.key) {
        return true;
      }
      if (item.children) {
        return item.children.some((child) => child.key === e.key);
      }
      return false;
    });
  
    if (menuItem) {
      if (menuItem.children) {
        const childItem = menuItem.children.find((child) => child.key === e.key);
        if (childItem) {
          setTitle(childItem.label);
          return;
        }
      }
      setTitle(menuItem.label);
    }
  };
  


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
        <div className="flex justify-around ">
        <Button
          type="text"
          icon={collapsed ? <VerticalLeftOutlined  /> : <VerticalRightOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            color: "white",
          }}
        />
        {collapsed ? null :  <img src={logo} alt="logo" className="w-16 m-3 transition duration-300"/>}
       
        </div>
       
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={sidebar}
          onClick={handleChangeTitle}
        />
      </Sider>
      <Layout
        className="transform duration-200"
        style={{
          marginLeft: collapsed ? "80px" : "200px",
        }}
      >
        <Header className="  p-0 bg-gray-200 flex justify-between items-center px-10 sticky top-0 z-10 shadow-lg">
          <p className="font-bold text-2xl">{title}</p>
          <div className="flex justify-center items-center gap-5">
            <p>{user.firstname + " " + user.lastname}</p>

            <Dropdown
              className="flex float-right"
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <div onClick={(e) => e.preventDefault()}>
                {user.profile === null ? (
                  <Avatar icon={<UserOutlined />} />
                ) : (
                  <img
                    className="border-2 border-blue-gray-400 rounded-full object-cover  w-10 h-10"
                    src={configImage.image_path + user.image}
                    alt="User Profile"
                  />
                )}
              </div>
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
        onOk={onUpdate}
        onCancel={onCancel}
        maskClosable={false}
        footer={null}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onUpdate}
          name="controll-hooks"
        >
          <Form.Item
            name="oldPassword"
            label="OldPassword"
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
            name="newPassword"
            label="NewPassword"
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
            name="confirmPassword"
            label="ConfirmPassword"
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
              <button
                htmlType="button"
                className=" text-center border border-BgBtn w-32 border-dashed hover:bg-BgBtnHover  px-2 py-2 rounded-lg mt-2 text-black"
                onClick={onClear}
              >
                Clear
              </button>

              <button
                htmlType="submit"
                className="bg-BgBtn w-32 hover:bg-BgBtnHover text-white px-2 py-2 rounded-lg mt-2"
              >
                Update
              </button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};
export default AdminLayout;
