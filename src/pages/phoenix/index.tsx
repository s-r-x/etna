import React from "react";
import { Row, Col } from "antd";
import PhoenixModule from "@/domains/ws/components/Phoenix";
import PhoenixLogger from "@/domains/ws/components/Logger/Phoenix";

export const PhoenixPage = () => {
  return (
    <Row style={{ flex: 1 }} gutter={12}>
      <Col span={12}>
        <PhoenixModule />
      </Col>
      <Col span={12}>
        <PhoenixLogger />
      </Col>
    </Row>
  );
};

export default PhoenixPage;
