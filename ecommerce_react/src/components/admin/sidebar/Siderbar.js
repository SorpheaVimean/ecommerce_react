import React, { useState } from 'react';
import { MdOutlineDashboard } from "react-icons/md";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet, useNavigate  } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const Siderbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const onLinkPage = (routeName) => {
    // use for link to other page
    navigate(routeName); // /category , /login
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className='fixed h-screen'>
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
          defaultSelectedKeys={['1']}
          items={[
            {
              key: "1",
              icon: <MdOutlineDashboard />
              ,
              label: "Home",
              onClick: () => onLinkPage("DashBoard"),
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
        className='p-0 bg-Background'
          style={{
            padding: 0,
           
          }}
        >
         
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
         <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Siderbar;