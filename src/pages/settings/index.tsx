import React from "react";
import CodeEditor from "@/components/modules/Settings/CodeEditor";
import { Collapse } from "antd";
const { Panel } = Collapse;

const SettingsPage = () => {
  return (
    <div>
      <Collapse defaultActiveKey={["editor"]}>
        <Panel key="editor" header="Code editor">
          <CodeEditor />
        </Panel>
      </Collapse>
    </div>
  );
};
export default SettingsPage;
