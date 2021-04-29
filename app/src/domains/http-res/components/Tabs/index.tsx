import React from "react";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import CountTab from "@/components/atoms/CountTab";
import { TConnectorProps } from "../../connectors";

type TProps = Pick<TConnectorProps, "category" | "changeCategory"> & {
  headersLength: number;
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
      <TabPane
        tab={<CountTab title="Headers" count={props.headersLength} />}
        key="headers"
      >
        {props.Headers}
      </TabPane>
    </Tabs>
  );
};
export default HttpResponseTabs;
