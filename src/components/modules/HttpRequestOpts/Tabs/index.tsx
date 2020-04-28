import React from "react";
import { Tabs } from "antd";
import { TProviderProps, provide } from "./provider";
const { TabPane } = Tabs;

type TProps = TProviderProps & {
  HeadersEditor: React.ReactElement;
  QueryEditor: React.ReactElement;
  BodyEditor: React.ReactElement;
  AuthEditor: React.ReactElement;
};
const HttpOptsTabs = (props: TProps) => {
  return (
    <Tabs
      destroyInactiveTabPane
      animated={false}
      defaultActiveKey="headers"
      activeKey={props.active}
      onChange={props.onChange}
    >
      <TabPane tab="Headers" key="headers">
        {props.HeadersEditor}
      </TabPane>
      <TabPane tab="Query" key="query">
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
