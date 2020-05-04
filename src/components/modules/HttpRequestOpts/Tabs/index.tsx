import React from "react";
import { Tabs, Badge } from "antd";
import { TProviderProps, provide } from "./provider";
const { TabPane } = Tabs;

const BADGE_COLOR = "#52c41a";

type TProps = TProviderProps & {
  HeadersEditor: React.ReactElement;
  QueryEditor: React.ReactElement;
  BodyEditor: React.ReactElement;
  AuthEditor: React.ReactElement;
};
const HttpOptsTabs = (props: TProps) => {
  return (
    <Tabs
      type="card"
      destroyInactiveTabPane
      animated={false}
      defaultActiveKey="headers"
      activeKey={props.active}
      onChange={props.onChange}
    >
      <TabPane
        tab={
          <div
            style={{
              paddingRight: "25px",
            }}
          >
            <Badge
              showZero
              style={{
                backgroundColor: BADGE_COLOR,
              }}
              offset={[17, 1]}
              count={props.headersLength}
            >
              Headers
            </Badge>
          </div>
        }
        key="headers"
      >
        {props.HeadersEditor}
      </TabPane>
      <TabPane
        tab={
          <div
            style={{
              paddingRight: "25px",
            }}
          >
            <Badge
              showZero
              style={{
                backgroundColor: BADGE_COLOR,
              }}
              offset={[17, 1]}
              count={props.queryLength}
            >
              Query
            </Badge>
          </div>
        }
        key="query"
      >
        {props.QueryEditor}
      </TabPane>
      <TabPane tab="Body" key="body">
        {props.BodyEditor}
      </TabPane>
      <TabPane tab="Auth" key="auth">
        {props.AuthEditor}
      </TabPane>
    </Tabs>
  );
};
export default provide(HttpOptsTabs);
