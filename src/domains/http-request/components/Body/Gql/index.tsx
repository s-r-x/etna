import React from "react";
import CodeEditor from "@/domains/code-editor/components";
import { connector, TConnectorProps } from "../../../connectors/gql";
import { Typography, Space, Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";

type TProps = {
  value: string;
  onChange: (value: string) => void;
} & TConnectorProps;
const GqlEditor = (props: TProps) => {
  return (
    <>
      <Space size="middle" style={{ width: "100%" }} direction="vertical">
        <div>
          <Typography.Text strong>Query</Typography.Text>
          <CodeEditor
            extra={
              <Button
                onClick={() =>
                  props.loading
                    ? props.cancelLoadGqlSchema()
                    : props.loadGqlSchema()
                }
                loading={props.loading}
                icon={<SyncOutlined />}
                size="small"
              >
                Schema
              </Button>
            }
            value={props.value}
            onChange={props.onChange}
            mode="graphql"
            gqlSchema={props.schema}
          />
        </div>
        <div>
          <Typography.Text strong>Variables(JSON)</Typography.Text>
          <CodeEditor
            value={props.vars}
            onChange={props.updateGqlVars}
            mode="application/json"
          />
        </div>
      </Space>
    </>
  );
};

export default connector(GqlEditor);
