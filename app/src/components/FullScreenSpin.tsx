import React from "react";
import { Spin } from "antd";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FullScreenSpin = () => (
  <Container>
    <Spin size="large" />
  </Container>
);
export default FullScreenSpin;
