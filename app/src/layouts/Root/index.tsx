import React from "react";
import { Layout } from "antd";
import { GlobalOutlined, SettingOutlined } from "@ant-design/icons";
import * as S from "./styled";
import ThemeToggler from "@/domains/theme/components/Toggler";
import SocketIOIcon from "@/components/icons/SocketIO";
import PhoenixIcon from "@/components/icons/Phoenix";
import { connect, ConnectedProps } from "react-redux";
import { open as openSettings } from "@/domains/settings/store/slice";

const connector = connect(null, {
  openSettings,
});
const RootLayout: React.FC<ConnectedProps<typeof connector>> = (props) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <S.Header>
        <S.Logo alt="logo" src="/logo.svg" />
        <S.Menu>
          <li>
            <S.Link
              title="HTTP"
              exact
              activeClassName="link-active"
              to="/"
              style={{
                paddingTop: "1px",
                fontSize: "21px",
              }}
            >
              <GlobalOutlined />
            </S.Link>
          </li>
          <li>
            <S.Link
              title="Socket.IO"
              activeClassName="link-active"
              to="/socketio"
              style={{ fontSize: "22px", paddingTop: "2px" }}
            >
              <SocketIOIcon />
            </S.Link>
          </li>
          <li>
            <S.Link
              title="Phoenix channels"
              activeClassName="link-active"
              to="/phoenix"
              style={{ fontSize: "30px", paddingTop: "2px" }}
            >
              <PhoenixIcon />
            </S.Link>
          </li>
          <li>
            <S.Link
              style={{
                fontSize: "20px",
              }}
              as="button"
              onClick={props.openSettings}
            >
              <SettingOutlined />
            </S.Link>
          </li>
        </S.Menu>
        <ThemeToggler />
      </S.Header>
      <S.Content>{props.children}</S.Content>
    </Layout>
  );
};

export default connector(RootLayout);
