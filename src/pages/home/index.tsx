import React from "react";
import HttpRequestOpts from "@/components/modules/HttpRequestOpts";
import { Row, Col } from "antd";
import HttpRequestForm from "@/components/modules/HttpRequestForm";
import HttpRequestHistory from "@/components/modules/HttpRequestHistory";
import HttpResponse from "@/components/modules/HttpResponse";
import { Card } from "antd";

export const HomePage = () => {
  return (
    <Row style={{ height: "100%" }} gutter={24}>
      <Col span={17}>
        <Card title="Request">
          <HttpRequestForm />
          <HttpRequestOpts />
        </Card>
        <Card style={{ marginTop: "24px" }} title="Response">
          <HttpResponse />
        </Card>
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
