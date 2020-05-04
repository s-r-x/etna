import React from "react";
import { TProviderProps } from "../provider";
import { Tabs } from "antd";
const { TabPane } = Tabs;

type TProps = Pick<TProviderProps, "category" | "changeCategory"> & {
  Body: React.ReactElement;
  Headers: React.ReactElement;
};
const HttpResponseTabs = (props: TProps) => {
  return (
    <Tabs
      type="card"
      destroyInactiveTabPane
      animated={false}
      defaultActiveKey="body"
      activeKey={props.category}
      onChange={props.changeCategory}
    >
      <TabPane tab="Body" key="body">
        {props.Body}
      </TabPane>
      <TabPane tab="Headers" key="headers">
        {props.Headers}
      </TabPane>
    </Tabs>
  );
};
export default HttpResponseTabs;
