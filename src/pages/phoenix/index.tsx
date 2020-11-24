import React from "react";
import { Row, Col } from "antd";
import PhoenixModule from "@/domains/ws/components/Phoenix";

export const PhoenixPage = () => {
  return (
    <Row style={{ flex: 1 }} gutter={12}>
      <Col span={12}>
        <PhoenixModule />
      </Col>
    </Row>
  );
};

export default PhoenixPage;
