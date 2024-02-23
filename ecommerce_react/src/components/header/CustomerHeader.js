import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import {
  UserOutlined,
  LogoutOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Space, Modal, Form, Input, message } from "antd";
import { configImage, getUser, isLogin, logout } from "../../share/help";
import { Header } from "antd/es/layout/layout";
import { request } from "../../share/request";

const CustomerHeader = () => {

  const [form] = Form.useForm();
  const user = getUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const onLinkPage = (routeName) => {
    // use for link to other page
    navigate(routeName); // /category , /login
  };

  //Logout
  const onLogOut = () => {
    logout();
    window.location.href = "/login";
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
    const params = {
      id: user.id,
      email: user.email,
      oldPassword: value.oldPassword,
      newPassword: value.newPassword,
      confirmPassword: value.confirmPassword,
    };
    const res = await request("customer/setPassword", "POST", params);
    if (res) {
      message.success(res.message);
      onCancel();
    }
  };
  // dropdown of profile
  const items = [
    {
      label: "View Order",
      key: "1",
      onClick: () => onLinkPage("/order"),
    },
    {
      label: "ViewProfile",
      key: "2",
      onClick: () => onLinkPage("/customerprofile"),
    },
    {
      type: "divider",
    },
    {
      label: <span>Reset password</span>,
      key: "3",
      onClick: showModal,
    },
    {
      label: (
        <span>
          <LogoutOutlined /> LogOut
        </span>
      ),
      key: "4",
      onClick: onLogOut,
    },
  ];


  return (
    <div className="bg-Backproducts h-18 lg:h-18 flex items-center ">
      <div className="flex justify-between items-center w-full mx-[20px] xs:mx-[30px] xl:mx-[70px] ">
        <div>
          <Link to={"/"}>
            {" "}
            <img
              alt="logo"
              src={logo}
              className="w-9 lg:w-11 cursor-pointer "
            />
          </Link>
        </div>
      
        {!isLogin() ? (
          <Space>
            <Link to={"login"}>
              {" "}
              <button className="w-18 h-10 px-4 text-black rounded-lg hover:shadow-2xl justify-center items-center gap-2 inline-flex hover:bg-gray-200 hover:border-gray-400 transition duration-300">
                Log In
              </button>
            </Link>
            <Link to={"signUp"}>
              <button className="w-18 h-10 px-4 text-sm text-white bg-neutral-800 rounded-lg shadow-2xl justify-center items-center inline-flex hover:bg-neutral-600 transition duration-200">
                Sign Up
              </button>
            </Link>
          </Space>
        ) : (
          <Header className="  p-0 bg-transparent flex justify-between items-center px-10 sticky top-0  ">
            <div className="flex justify-center items-center gap-5">
              <Space size={"large"}>
                <Link to={"wishlist"}>
                  <HeartOutlined className="text-3xl hover:text-BgBtn transition duration-300 cursor-pointer " />
                </Link>
                <Link to={"cart"}>
                  <ShoppingCartOutlined className="text-3xl hover:text-BgBtn transition duration-300 cursor-pointer " />
                </Link>

                <p>{user.firstname + " " + user.lastname}</p>

                <Dropdown
                  className="flex float-right cursor-pointer"
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
              </Space>
            </div>
          </Header>
        )}
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
      </div>
    </div>
  );
};

export default CustomerHeader;
