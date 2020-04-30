import React from "react";
import CodeEditor from "@/components/CodeEditor";
import { provide, TProviderProps } from "./provider";
import MIMESelect from "./MIMESelect";
import FilesUpload from "./FilesUpload";
import KVEditor from "./KVEditor";
import { Space } from "antd";

const BodyEditor = (props: TProviderProps) => {
  return (
    <div>
      <Space style={{ width: "100%", display: "flex" }} direction="vertical">
        <MIMESelect value={props.bodyMIME} onChange={props.changeBodyMIME} />
        {props.activeEditor === "file" && <FilesUpload />}
        {props.activeEditor === "kv" && <KVEditor />}
        {props.activeEditor === "text" && (
          <CodeEditor
            mode={props.bodyMIME}
            value={props.bodyText}
            onChange={props.changeBodyText}
          />
        )}
      </Space>
    </div>
  );
};
export default provide(BodyEditor);
