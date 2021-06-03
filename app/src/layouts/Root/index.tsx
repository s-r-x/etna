import React from "react";
import { Layout, Typography } from "antd";
import { GlobalOutlined, SettingOutlined } from "@ant-design/icons";
import * as S from "./styled";
import ThemeToggler from "@/domains/theme/components/Toggler";
import SocketIOIcon from "@/components/icons/SocketIO";
import PhoenixIcon from "@/components/icons/Phoenix";

const RootLayout: React.FC = (props) => {
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
              <GlobalOutlined style={{ fontSize: "20px" }} />
            </S.Link>
          </li>
          <li>
            <S.Link activeClassName="link-active" to="/socketio">
              <SocketIOIcon style={{ fontSize: "22px", paddingTop: "13px" }} />
            </S.Link>
          </li>
          <li>
            <S.Link activeClassName="link-active" to="/phoenix">
              <PhoenixIcon style={{ fontSize: "30px", paddingTop: "10px" }} />
            </S.Link>
          </li>
          <li>
            <S.Link as="button">
              <SettingOutlined style={{ fontSize: "20px" }} />
            </S.Link>
          </li>
        </S.Menu>
        <ThemeToggler />
      </S.Header>
      <S.Content>{props.children}</S.Content>
    </Layout>
  );
};

export default RootLayout;
