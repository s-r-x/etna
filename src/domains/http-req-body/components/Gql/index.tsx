import React from "react";
import CodeEditor from "@/domains/code-editor/components";
import { connector, TConnectorProps } from "../../connectors/gql";
import { Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import * as S from "./styled";

type TProps = {
  value: string;
  onChange: (value: string) => void;
} & TConnectorProps;
const GqlEditor = (props: TProps) => {
  return (
    <S.Container>
      <S.QueryContainer>
        {/*<Typography.Text strong>Query</Typography.Text>*/}
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
      </S.QueryContainer>
      <S.VarsContainer>
        {/*<Typography.Text strong>Variables(JSON)</Typography.Text>*/}
        <CodeEditor
          value={props.vars}
          onChange={props.updateGqlVars}
          mode="application/json"
        />
      </S.VarsContainer>
    </S.Container>
  );
};

export default connector(GqlEditor);
