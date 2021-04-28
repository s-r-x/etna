import React from "react";
import { Row, Col } from "antd";
import SocketIoRequest from "@/domains/ws/socket-io/components";
import SocketIOLogger from "@socket-io/components/Logger";

export const SocketIOPage = () => {
  return (
    <>
      <Row style={{ flex: 1 }} gutter={12}>
        <Col span={12}>
          <SocketIoRequest />
        </Col>
        <Col span={12}>
          <SocketIOLogger />
        </Col>
      </Row>
    </>
  );
};

export default SocketIOPage;
