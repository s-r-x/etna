import React from "react";
import CodeEditor from "@/components/modules/Settings/CodeEditor";
import Proxy from "@/components/modules/Settings/Proxy";
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
