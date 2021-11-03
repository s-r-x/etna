import styled from "styled-components";
import { NavLink as BaseLink } from "react-router-dom";
import { Layout } from "antd";

export const Logo = styled.img`
  display: block;
  width: 24px;
`;

export const Header = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.paper};
  height: var(--navbar-height);
  line-height: var(--navbar-height);
  padding: 0 30px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;
export const Menu = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-left: 30px;
  li {
    position: relative;
    width: var(--navbar-height);
    height: var(--navbar-height);
  }
`;

export const Link = styled(BaseLink)`
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  color: ${({theme }) => theme.colors.font.accent};
  transition: color 0.25s ease;
  font-size: 16px;
  &.link-active {
    color: ${({ theme }) => theme.colors.primary.accent};
  }
`;
export const Content = styled(Layout.Content)`
  display: flex;
  margin: var(--root-layout-offset);
  @media (max-width: 991px) {
    display: block;
  }
`;
