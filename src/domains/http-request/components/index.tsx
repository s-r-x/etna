import React from "react";
import Editors from "./EditorsTabs";
import Form from "./MainForm";
import { Card } from "antd";

const HttpRequest = () => (
  <Card title="Request">
    <Form />
    <Editors />
  </Card>
);

export default HttpRequest;
