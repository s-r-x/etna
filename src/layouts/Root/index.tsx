import React from "react";
import cls from "./index.less";
import { Layout, Menu, Typography } from "antd";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { SelectParam } from "antd/lib/menu";

const { Header, Content, Sider } = Layout;
type TProps = RouteComponentProps;
type TState = {
  collapsed: boolean;
  activeRoute: string;
};

class RootLayout extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      collapsed: true,
      activeRoute: props.location.pathname,
    };
  }
  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };
  onSelect = ({ key }: SelectParam) => {
    this.props.history.push(key);
  };
  componentDidMount() {
    this.props.history.listen((listener) => {
      this.setState({
        activeRoute: listener.pathname,
      });
    });
  }
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
          <Menu
            onSelect={this.onSelect}
            theme="dark"
            selectedKeys={[this.state.activeRoute]}
            mode="inline"
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link className={cls.link} to="/">
                Home
              </Link>
            </Menu.Item>
            <Menu.Item icon={<SettingOutlined />} key="/settings">
              <Link className={cls.link} to="/settings">
                Settings
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header />
          <Content style={{ margin: "12px", height: "100%" }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(RootLayout);
