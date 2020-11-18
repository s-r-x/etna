import styled from "styled-components";
import { Link as BaseLink } from "react-router-dom";
import { Layout } from "antd";

export const Logo = styled.div`
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
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary.accent};
  line-height: 50px;
  height: 50px;
`;
