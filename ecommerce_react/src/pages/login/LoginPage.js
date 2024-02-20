import React, { useState } from "react";
import { Link } from "react-router-dom";
import {request} from "../../share/request";
import bgn from "./login-bg.svg";
import logo from "../../img/logo.png";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

import { Button, Checkbox, Form, Input, message, Segmented  } from "antd";
import { Header } from "antd/es/layout/layout";
import { storeUserData } from "../../share/help";

const LoginPage = () => {
  const [loading, setLoading] = useState();
  const [loginType, setLoginType] = useState("employee"); // Default login type
  const onFinishEmployee = async (values) => {
    setLoading(true)
    var param = {
      "email": values.email,
      "password": values.password,
    }
    const res = await request( "employee/login", "POST", param);
    setLoading(false) 
    if(res.isSuccess){
      message.success(res.message);
      storeUserData(res)
      window.location.href="/admin"
      
    }
  };
  const onFinishCustomer = async (values) => {
    setLoading(true)
    var param = {
      "email": values.email,
      "password": values.password,
    }
    const res = await request( "customer/login", "POST", param);
    setLoading(false) 
    if(res.isSuccess){
      message.success(res.message);
      storeUserData(res)
      window.location.href="/"
      
    }
  };
 const options = [
  { label: 'Login as Customer',
      value: "customer",
      className: " text-BgBtnHover  ",
  },
  { label: 'Login as employee',
      value: "employee",
      className: "text-BgBtnHover ",
  },
  ]
  const handleLoginTypeChange = (value) => {
    setLoginType(value);
  };
  const onFinish = loginType === "customer" ? onFinishCustomer : onFinishEmployee;
  return (
    <div>
      <Header className="flex items-center h-24">
        <Link to={"/"}>
          <img alt="logo" src={logo} className="w-16 lg:w-20 cursor-pointer " />
        </Link>
      </Header>
      <div
        className="  bg-cover bg-no-repeat flex justify-center items-center "
        style={{ backgroundImage: `url(${bgn})`, minHeight: "100vh" }}
      >
        
        <div className="bg-pink-500 bg-opacity-15 shadow-lg backdrop-blur-lg backdrop-filter border-10 border-solid border-white  rounded-xl text-white  px-10 w-[360px] md:w-[500px]">
          <h2 className="mt-10 text-center text-3xl md:text-5xl font-bold leading-9 tracking-tight text-slate-200">
            Log in to VShop
          </h2>
          {/* connect with */}
          <div className="my-10  flex flex-col items-center justify-center  text-md font-bold leading-9 tracking-tigh text-gray-300">
            <button  className="flex items-center border-2 px-5 py-1 rounded-full border-slate-400 hover:border-white mb-2">
              <FcGoogle className=" text-2xl mr-10 " />
              <p className=" mr-12 text-white ">Continue with Google</p>
            </button>
            <button  className="flex items-center border-2 px-4 py-1 rounded-full border-slate-400 hover:border-white mb-2">
              <FaFacebook className=" text-2xl mr-8 text-[#1877f2]" />
              <p className=" mr-12 text-white">Continue with Facebook</p>
            </button>
            <button  className="flex items-center border-2 px-5 py-1 rounded-full border-slate-400 hover:border-white">
              <FaApple className=" text-2xl mr-10 text-white" />
              <p className=" mr-12 text-white">Continue with Apple</p>
            </button>
          </div>
          <Segmented options={options} value={loginType} onChange={handleLoginTypeChange} block />

          {/* form */}
          <Form
            name="normal_login"
            className="login-form"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              label={<span className="text-white">Email</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                // prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Input your email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={<span className="text-white">Password</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password placeholder="Input your Password" />
            </Form.Item>
            <div className="flex justify-between items-center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="text-white">Remember me</Checkbox>
              </Form.Item>

              <div className="login-form-forgot text-white" href="#">
                Forgot password
              </div>
            </div>
            <Form.Item className="flex justify-center items-center mt-10">
              <Button
              loading={loading}
                type="primary"
                htmlType="submit"
                className="login-form-button bg-BgBtn  text-black w-80 duration-300 hover:scale-110"
              >
                Log in
              </Button>
            </Form.Item>
            <p className="mt-10 text-center text-sm text-gray-400 mb-5">
              Don't have an account?
              <a
                href="signUp"
                className="font-semibold leading-6 text-white hover:text-green-400 underline cursor-pointer"
              >
                Sign up for Vshop
              </a>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
