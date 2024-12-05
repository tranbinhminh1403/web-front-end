import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Cart from "./Cart";
import UserInfo from "./UserInfo";
import PaidProducts from "./PaidProducts";
const { Sider, Content } = Layout;

const Profile = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1"); // State for selected menu item

  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key); // Update state with selected menu item key
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "1":
        return <UserInfo />;
      case "2":
        return (
          <div
            style={{
              minHeight: "60vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <Cart />
          </div>
        );
      case "3":
        return (
          <div>
            <PaidProducts />
          </div>
        );
      default:
        return <div>Welcome to the profile page!</div>;
    }
  };

  return (
    <>
      <Navbar />
      <Layout style={{ minHeight: "80vh", marginTop: 72 }}>
        <Sider
          style={{ backgroundColor: "#fff" }}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          trigger={null}
          breakpoint="lg"
        >
          <Menu
            theme="dark"
            style={{ backgroundColor: "#fff" }}
            defaultSelectedKeys={["1"]}
            mode="inline"
            onClick={handleMenuClick}
          >
            <Menu.Item
              style={{ color: "#000", marginTop: 20 }}
              key="1"
              icon={<UserOutlined />}
            >
              Thông tin cá nhân
            </Menu.Item>
            <Menu.Item
              style={{ color: "#000", marginTop: 20 }}
              key="2"
              icon={<ShoppingCartOutlined />}
            >
              Giỏ hàng
            </Menu.Item>
            <Menu.Item
              style={{ color: "#000", marginTop: 20 }}
              key="3"
              icon={<DollarOutlined />}
            >
              Lịch sử mua hàng
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "0 16px" }}>
            {renderContent()} {/* Render content based on selected menu item */}
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </>
  );
};

export default Profile;
