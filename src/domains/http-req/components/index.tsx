import React from "react";
import Editors from "./EditorsTabs";
import Form from "./MainForm";
import { Card } from "antd";

const HttpRequest = () => {
  return (
    <Card style={{ height: "100%" }}>
      <>
        <Form />
        <Editors />
      </>
    </Card>
  );
};

export default HttpRequest;
