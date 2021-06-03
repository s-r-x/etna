import React from "react";
import CodeEditor from "@/domains/settings/components/CodeEditor";
import Proxy from "@/domains/settings/components/Proxy";
import { Row, Col } from "antd";
import { Card } from "antd";

const SettingsPage = () => {
  return (
    <Row style={{ flex: 1 }} gutter={12}>
      <Col span={12}>
        <Card title="Text editor">
          <CodeEditor />
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Proxy">
          <Proxy />
        </Card>
      </Col>
    </Row>
  );
};
export default SettingsPage;
