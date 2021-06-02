import React from "react";
import { SyncOutlined, StopOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { TConnectorProps } from "../../connectors";
import SaveResponse from "./SaveResponse";
import CopyResponse from "./CopyResponse";

type TProps = Pick<
  TConnectorProps,
  | "makeRequest"
  | "loading"
  | "cancelRequest"
  | "rawBody"
  | "prettyBody"
  | "filename"
  | "headers"
  | "isPrettyBodySupported"
  | "category"
  | "responseType"
> & {
  isBinary: boolean;
};
const Actions = (props: TProps) => {
  const onRequest = () => props.makeRequest();
  return (
    <div>
      <Space size="small">
        <Tooltip title="Cancel request">
          <Button
            disabled={!props.loading}
            icon={<StopOutlined />}
            danger
            onClick={props.cancelRequest}
          />
        </Tooltip>
        <Tooltip title="Send again">
          <Button
            disabled={props.loading}
            icon={<SyncOutlined />}
            loading={props.loading}
            onClick={onRequest}
          />
        </Tooltip>
        <SaveResponse
          responseType={props.responseType}
          isBinary={props.isBinary}
          isPrettyBodySupported={props.isPrettyBodySupported}
          headers={props.headers}
          filename={props.filename}
          prettyBody={props.prettyBody}
          rawBody={props.rawBody}
        />
        <CopyResponse
          isPrettyBodySupported={props.isPrettyBodySupported}
          headers={props.headers}
          prettyBody={props.prettyBody}
          rawBody={props.rawBody}
        />
      </Space>
    </div>
  );
};
export default Actions;
