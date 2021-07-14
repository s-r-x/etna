import React from "react";
import CodeEditor from "@/domains/code-editor/components";
import { Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import * as S from "./styled";
import { HttpReqBodySelectors as Selectors } from "../../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { HttpReqBodyActions as Actions } from "../../store/slice";

const connector = connect(
  (state) => ({
    value: Selectors.getText(state),
    loading: Selectors.isGqlSchemaLoading(state),
    vars: Selectors.getGqlVars(state),
    schema: Selectors.getGqlSchema(state),
  }),
  {
    cancelLoadGqlSchema: Actions.cancelLoadGqlSchema,
    loadGqlSchema: Actions.loadGqlSchema,
    updateGqlVars: Actions.updateGqlVars,
    onChange: Actions.changeText,
  }
);
type TConnectorProps = ConnectedProps<typeof connector>;

const GqlEditor = (props: TConnectorProps) => {
  return (
    <S.Container>
      <S.QueryContainer>
        <S.MainEditorWrap>
          <CodeEditor
            allowPrettify
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
        </S.MainEditorWrap>
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
