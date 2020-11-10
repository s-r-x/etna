import React from "react";
import CodeEditor from "@/domains/settings/components/CodeEditor";
import Proxy from "@/domains/settings/components/Proxy";
import { Card } from "antd";
import cls from "./index.less";

const SettingsPage = () => {
  return (
    <div className={cls.container}>
      <Card title="Text editor">
        <CodeEditor />
      </Card>
      <Card title="Proxy">
        <Proxy />
      </Card>
    </div>
  );
};
export default SettingsPage;
