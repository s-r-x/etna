import React from "react";
import CodeEditor from "@/domains/settings/components/CodeEditor";
import Proxy from "@/domains/settings/components/Proxy";
import { Card } from "./styled";

const SettingsPage = () => {
  return (
    <div>
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
