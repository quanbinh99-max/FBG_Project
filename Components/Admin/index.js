import React, { useEffect } from "react";
import apiClient from "../../util/http-common";
import { Layout, Menu } from "antd";
import Participants from "./participants";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;
const items = [UserOutlined, UserOutlined].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

function Index(props) {
  return (
    <div>
      {" "}
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
          />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginLeft: 200,
          }}
        >
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          />
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                textAlign: "center",
              }}
            >
              <Participants></Participants>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default Index;
