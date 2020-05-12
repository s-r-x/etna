import React from "react";
import CodeEditor from "@/components/modules/Settings/CodeEditor";
import { Card, Row, Col } from "antd";

const SettingsPage = () => {
  return (
    <div>
      <Row>
        <Col span={12}>
          <Card title="Text editor">
            <CodeEditor />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default SettingsPage;
