import React from "react";
import { Form, Input } from "antd";

const CodeEditorSettings = () => {
  return (
    <Form>
      <Form.Item label="Key mapping" name="keyMap">
        <Input />
      </Form.Item>
      <Form.Item label="Tab size" name="tabSize">
        <Input />
      </Form.Item>
      <Form.Item label="Theme" name="theme">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default CodeEditorSettings;
