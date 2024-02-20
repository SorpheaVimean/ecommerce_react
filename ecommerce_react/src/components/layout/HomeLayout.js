import React from "react";
import Headers from "../header/CustomerHeader";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";
import { Layout, FloatButton } from "antd";
import {

  CommentOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { FiSend } from "react-icons/fi";
const { Header, Content } = Layout;

const HomeLayout = () => {


  return (
    <div>
      <Layout>
        <Header className="p-0 ">
          <Headers />
        </Header>

        <Navbar />
        <Content>
          <Outlet />
        </Content>
        <Footer />
      </Layout>

      <FloatButton.Group
        trigger="click"
        type="primary"
        className=" mr-[20px] xs:mr-[30px] "
        icon={<FiSend />}
      >
        <FloatButton icon={<CommentOutlined />} />
        <FloatButton icon={<CustomerServiceOutlined />} />
        <FloatButton />
      </FloatButton.Group>

      <FloatButton.BackTop className="mr-20" />
      
       
      
    </div>
  );
};

export default HomeLayout;
