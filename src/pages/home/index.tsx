import React from "react";
import { Row, Col } from "antd";
//import HttpRequestHistory from "@/domains/http-request-history/components";
import HttpResponse from "@/domains/http-response/components";
import HttpRequest from "@/domains/http-request/components";
//import { Card } from "antd";

export const HomePage = () => {
  return (
    <>
      <Row gutter={12}>
        <Col span={12}>
          <HttpRequest />
        </Col>
        <Col span={12}>
          <HttpResponse />
        </Col>
      </Row>
      {/*
      <Row>
        <Col span={24}>
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
          */}
    </>
  );
};

export default HomePage;
