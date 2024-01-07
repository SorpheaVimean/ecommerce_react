import React from "react";
import banner1 from "../../img/banner1.png";
import logo from "../../img/logo.png";
import logos from "./background.png";
import wave from "./wave.png";
import waves from "./wave.svg";
import { Button, Checkbox, Form, Input } from "antd";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const ContactPage = () => {
  return (
    <div> 
      <div className="relative flex justify-center  overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="min-w-[1000px] w-full  h-auto"
        >
          <path
            fill="#d9d9d9"
            fill-opacity="1"
            d="M0,288L120,272C240,256,480,224,720,218.7C960,213,1200,235,1320,245.3L1440,256L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
          ></path>
        </svg>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="min-w-[1000px] w-full  h-auto">
        <path
            fill="#d2e3c8"
            fillOpacity="1"
            d="M0,160L80,181.3C160,203,320,245,480,256C640,267,800,245,960,224C1120,203,1280,181,1360,170.7L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
    </svg> */}
        <div className="absolute text-white pt-16 md:pt-26 text-5xl">
          <p>GET IN TOUCH</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10  mx-[20px] xs:mx-[30px] xl:mx-[70px] mb-7 ">
        <div className="shadow-2xl w-full ">
          {" "}
          <Form
            name="basic"
           layout="vertical"
          
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="p-10 mt-8"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Message"
              name="massage"
              rules={[
                {
                  required: true,
                  message: "Please input your message!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              
            >
              <button className="w-32 hover:shadow-2xl hover:translate-y-[-2]  duration-300  p-2"   htmlType="submit">
                Send →
              </button>
            </Form.Item>
          </Form>
        </div>
        <div>
                <div className="shadow-2xl p-5 mb-5 h-full justify-center flex flex-col" >
                  <h2 className="text-center font-bold mb-10">My Location</h2>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7735341830667!2d104.89253745069675!3d11.568086091746942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095173761d4a53%3A0xcd09ff2f4d326e3f!2sSETEC%20Institute!5e0!3m2!1sen!2skh!4v1616165094843!5m2!1sen!2skh" className="w-full rounded-md" allowfullscreen="" loading="lazy"></iframe>
                </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
