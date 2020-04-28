import React from "react";
import CodeEditor from "@/components/CodeEditor";
import { provide, TProviderProps } from "./provider";
import MIMESelect from "./MIMESelect";
import FilesUpload from "./FilesUpload";
import { CODE_EDITOR_MIME_SUPPORTS } from "@/misc/codeEditor";
import { Space } from "antd";

const BodyEditor = (props: TProviderProps) => {
  return (
    <div>
      <Space style={{ width: "100%" }} direction="vertical">
        <MIMESelect value={props.bodyMIME} onChange={props.changeBodyMIME} />
        {props.bodyMIME === "binary" && <FilesUpload />}
        {CODE_EDITOR_MIME_SUPPORTS.has(props.bodyMIME) && (
          <CodeEditor
            mode={props.bodyMIME}
            value={props.body}
            onChange={props.changeBody}
          />
        )}
      </Space>
    </div>
  );
};
export default provide(BodyEditor);
