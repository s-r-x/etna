import React from "react";
import { TConnectorProps, connector } from "../connectors/body";
import KVEditor from "./KV";
import Gql from "./Gql";
import { Space } from "antd";
import FilesUpload from "./Files";
import TextEditor from "./Text";

const BodyEditor = (props: TConnectorProps) => {
  return (
    <div>
      <Space style={{ width: "100%", display: "flex" }} direction="vertical">
        {props.MIME === "multipart/form-data" && <FilesUpload />}
        {props.activeEditor === "kv" && <KVEditor />}
        {props.activeEditor === "text" && (
          <TextEditor
            MIME={props.MIME}
            text={props.text}
            changeText={props.changeText}
          />
        )}
        {props.activeEditor === "graphql" && (
          <Gql value={props.text} onChange={props.changeText} />
        )}
      </Space>
    </div>
  );
};
export default connector(BodyEditor);
