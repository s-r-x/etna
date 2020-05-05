import React from "react";
import { TProviderProps } from "../provider";
import { Tabs, Badge } from "antd";
const { TabPane } = Tabs;

import { BADGE_COLOR } from "@/misc/color";

type TProps = Pick<TProviderProps, "category" | "changeCategory"> & {
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
        {props.Headers}
      </TabPane>
    </Tabs>
  );
};
export default HttpResponseTabs;
