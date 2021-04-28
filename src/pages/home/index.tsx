import React from "react";
import { Row, Col } from "antd";
import HttpResponse from "@/domains/http-res/components";
import HttpRequest from "@/domains/http-req/root/components";

export const HomePage = () => {
  return (
    <>
      <Row style={{ flex: 1 }} gutter={12}>
        <Col span={12}>
          <HttpRequest />
        </Col>
        <Col span={12}>
          <HttpResponse />
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
