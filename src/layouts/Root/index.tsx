import React from "react";
import { Layout, Typography } from "antd";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as S from "./styled";
import ThemeToggler from "@/domains/theme/components/Toggler";
import WebsocketIcon from "@/components/icons/Websocket";

const { Content } = Layout;
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
  onSelect = ({ key }: { key: string }) => {
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
        <S.Header>
          <S.Logo>
            <Typography.Title level={3} style={{ color: "white" }}>
              Etna
            </Typography.Title>
          </S.Logo>
          <S.Menu>
            <li>
              <S.Link exact activeClassName="link-active" to="/">
                <HomeOutlined />
              </S.Link>
            </li>
            <li>
              <S.Link activeClassName="link-active" to="/settings">
                <SettingOutlined />
              </S.Link>
            </li>
            <li>
              <S.Link activeClassName="link-active" to="/websocket">
                <WebsocketIcon style={{ fontSize: "20px" }} />
              </S.Link>
            </li>
          </S.Menu>
          <ThemeToggler />
        </S.Header>
        <Content style={{ margin: "12px", display: "flex" }}>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

export default withRouter(RootLayout);
