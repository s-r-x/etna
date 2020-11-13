import React from "react";
import CodeEditor from "@/domains/code-editor/components";
import { TConnectorProps, connector } from "../../connectors/body";
import MIMESelect from "./MimeSelect";
import KVEditor from "./KV";
import Gql from "./Gql";
import { Space } from "antd";
import FilesUpload from "./Files";

const BodyEditor = (props: TConnectorProps) => {
  return (
    <div>
      <Space style={{ width: "100%", display: "flex" }} direction="vertical">
        <MIMESelect value={props.bodyMIME} onChange={props.changeBodyMIME} />
        {props.bodyMIME === "multipart/form-data" && <FilesUpload />}
        {props.activeEditor === "kv" && <KVEditor />}
        {props.activeEditor === "text" && (
          <CodeEditor
            mode={props.bodyMIME}
            value={props.bodyText}
            onChange={props.changeBodyText}
          />
        )}
        {props.activeEditor === "graphql" && (
          <Gql value={props.bodyText} onChange={props.changeBodyText} />
        )}
      </Space>
    </div>
  );
};
export default connector(BodyEditor);
