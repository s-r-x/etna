import React from "react";
import { Row, Col } from "antd";
import WsRequest from "@/domains/ws/components/Request";
import WsLogger from "@/domains/ws/components/Logger";

export const WsPage = () => {
  return (
    <>
      <Row style={{ flex: 1 }} gutter={12}>
        <Col span={12}>
          <WsRequest />
        </Col>
        <Col span={12}>
          <WsLogger />
        </Col>
      </Row>
    </>
  );
};

export default WsPage;
