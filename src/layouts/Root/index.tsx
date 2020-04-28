import React from "react";
import cls from "./index.less";
import { Layout, Menu, Typography } from "antd";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export default class RootLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
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
            <Menu.Item key="1">
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9"></Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header />
          <Content style={{ margin: "20px" }}>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}
