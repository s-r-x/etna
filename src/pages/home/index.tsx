import React from "react";
import { Row, Col } from "antd";
import HttpRequestHistory from "@/domains/http-request-history/components";
import HttpResponse from "@/domains/http-response/components";
import HttpRequest from "@/domains/http-request/components";
import { Card } from "antd";

export const HomePage = () => {
  return (
    <Row style={{ height: "100%" }} gutter={24}>
      <Col span={17}>
        <HttpRequest />
        <HttpResponse />
      </Col>
      <Col span={7}>
        <Card
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          bodyStyle={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
          title="History"
        >
          <HttpRequestHistory />
        </Card>
      </Col>
    </Row>
  );
};

export default HomePage;
