import styled from "styled-components";
import { Link as BaseLink } from "react-router-dom";
import { Layout } from "antd";

export const Logo = styled.div`
  padding: 14px;
  text-align: center;
  * {
    margin: 0 !important;
  }
`;

export const Link = styled(BaseLink)`
  color: white;
`;
export const Header = styled(Layout.Header)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
