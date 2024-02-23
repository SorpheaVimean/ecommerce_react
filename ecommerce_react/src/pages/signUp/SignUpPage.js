import React, { useState } from "react";
import { Link } from "react-router-dom";
import bg from "./back_signup.svg";
import logo from "../../img/logo.png";
import styles from "./style.module.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  message,
} from "antd";
import { Header } from "antd/es/layout/layout";
import { Option } from "antd/es/mentions";
import { formatDateServer } from "../../share/help";
import { request } from "../../share/request";

const SignUpPage = () => {
  const [form] = Form.useForm();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const validateConfirmPassword = (rule, value, callback) => {
    if (value && value !== password) {
      callback("The passwords do not match!");
    } else {
      callback();
    }
  };

  const onFinish = async (values) => {
    const formatdob = formatDateServer(values.dob);
    var formData = new FormData();
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("gender", values.gender);
    formData.append("dob", formatdob);
    formData.append("email", values.email);
    formData.append("tel", values.tel);
    formData.append("address", values.address);
    formData.append("password", values.password);
    formData.append("image", form.getFieldValue("image"));
    if (image != null) {
      formData.append("img_customer", image, image.filename);
    }

    setLoading(true);
    const res = await request("customers", "POST", formData);
    setLoading(false);
    if (res) {
      message.success(res.message);
      window.location.href = "/login";
    }
  };
  return (
    <div>
      <Header className="flex justify-center items-center h-24">
        <Link to={"/"}>
          <img alt="logo" src={logo} className="w-16 lg:w-20 cursor-pointer " />
        </Link>
      </Header>

      <div
        className="  bg-cover bg-no-repeat flex justify-center items-center flex-col gap-5 "
        style={{ backgroundImage: `url(${bg})`, minHeight: "100vh" }}
      >
        <h2 className="mt-10 text-center text-3xl md:text-5xl font-bold leading-9 tracking-tight text-slate-200">
          Sign Up now to start shopping with VShop
        </h2>
        <div className="bg-pink-500 bg-opacity-15 shadow-lg backdrop-blur-lg backdrop-filter border-10 border-solid border-white  rounded-xl text-white  px-5 w-[350px] md:w-[500px]">
          <h2 className="mt-10 text-center text-3xl md:text-5xl font-bold leading-9 tracking-tight text-slate-200">
            Sign Up with VShop
          </h2>
          {/* connect with */}
          <div className="my-10  flex flex-col items-center justify-center  text-md font-bold leading-9 tracking-tigh text-gray-300">
            <div className="flex justify-between items-center gap-10 border-2 px-5 py-1 rounded-full border-slate-400 hover:border-white mb-2">
              <FcGoogle className=" text-2xl  " />
              <p className="  text-white ">Sign Up with Google</p>
            </div>
            <div className="flex justify-between items-center gap-6 border-2 px-5 py-1 rounded-full border-slate-400 hover:border-white mb-2">
              <FaFacebook className=" text-2xl  text-[#1877f2]" />
              <p className="  text-white">Sign Up with Facebook</p>
            </div>
          </div>
          <Divider className={styles.custom_divider}>or</Divider>
          <h2 className="mt-10 mb-5 text-center text-2xl md:text-3xl font-bold leading-9 tracking-tight text-slate-200">
            Sign Up now with VShop
          </h2>
          {/* form */}
          <Form name="normal_sigup" layout="vertical" onFinish={onFinish}>
          <Row gutter={5}>
              <Col span={12}>
                <Form.Item
                  name="firstname"
                  label={
                    <span className="text-white">What's your lastName?</span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please input your firstname!",
                    },
                  ]}
                >
                  <Input placeholder="Input your firstName" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastname"
                  label={
                    <span className="text-white">what's your lastName?</span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please input your lastname!",
                    },
                  ]}
                >
                  <Input placeholder="Input your lastName" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={5}>
              <Col span={12}>
                <Form.Item
                  name="gender"
                  label={<span className="text-white">Gender</span>}
                  allowClear
                  rules={[
                    {
                      required: true,
                      message: "Please select your gender!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Please select gender"
                    allowClear={true}
                    onChange={() => {}}
                  >
                    <Option value={"1"}>Male</Option>
                    <Option value={"0"}>Female</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dob"
                  label={<span className="text-white">Date of Birth</span>}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Date of birth!",
                    },
                  ]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>
              </Col>
            </Row>
            <div className="relative mb-3 text-xl  ">
              <Form.Item
                name="address"
                label={<span className="text-white">Address</span>}
                rules={[
                  {
                    required: true,
                    message: "Please input your address!",
                  },
                ]}
              >
                <Input.TextArea placeholder="Input your address" />
              </Form.Item>
              <Row gutter={5}>
                <Col span={12}>
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
                    <Input placeholder="Input your email" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="tel"
                    label={<span className="text-white">Phone Number</span>}
                    rules={[
                      {
                        required: true,
                        message: "Please input your telephone number!",
                      },
                      {
                        pattern: /^[0-9]+$/,
                        message: "Tel must contain only numbers!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <div className="relative mb-3 text-xl">
              <Form.Item
                name="password"
                label={<span className="text-white">Password</span>}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input
                  type="password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  placeholder="Input your password"
                />
              </Form.Item>
            </div>
            <div className="relative mb-3 text-xl">
              <Form.Item
                name="confirmPassword"
                label={<span className="text-white">Confirm Password</span>}
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm password!",
                  },
                  {
                    validator: validateConfirmPassword,
                  },
                ]}
              >
                <Input
                  type="password"
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                  placeholder="Confirm your password"
                />
              </Form.Item>
            </div>

            <div className="col-span-6 mt-5 flex justify-between">
              <Form.Item>
                <Checkbox className="text-white">
                  Accept all term and conditions
                </Checkbox>
              </Form.Item>
            </div>
            <Form.Item className="flex justify-center items-center mt-10">
              <Button
                htmlType="submit"
                className="login-form-button bg-BgBtn text-black w-80 duration-300 hover:scale-110"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <p className="mt-10 text-center text-sm text-gray-400 mb-5">
            Already have an account?
            <Link
              to="/login"
              className="font-semibold leading-6 text-white hover:text-green-400 underline cursor-pointer"
            >
              Log In for Vshop
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
