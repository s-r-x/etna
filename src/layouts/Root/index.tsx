import React from "react";
import cls from "./index.less";
import { Layout, Menu, Typography } from "antd";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

export default class RootLayout extends React.Component {
  state = {
    collapsed: true,
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className={cls.logo}>
            <Typography.Title level={3} style={{ color: "white" }}>
              Etna
            </Typography.Title>
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item icon={<HomeOutlined />} key="1">
              <span>Home</span>
            </Menu.Item>
            <Menu.Item icon={<SettingOutlined />} key="2">
              <span>Settings</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header />
          <Content style={{ margin: "20px", height: "100%" }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
