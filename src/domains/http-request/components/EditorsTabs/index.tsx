import React from "react";
import { Tabs } from "antd";
import { TConnectorProps, connector } from "../../connectors/tabs";
import HeadersEditor from "../Headers";
import QueryEditor from "../Query";
import BodyEditor from "../Body";
import Auth from "../Auth";
import Settings from "../Settings";
import cls from "./index.less";
import CountTab from "@/components/atoms/CountTab";
const { TabPane } = Tabs;

const Editors = (props: TConnectorProps) => {
  return (
    <div className={cls.container}>
      <Tabs
        type="card"
        destroyInactiveTabPane
        animated={false}
        defaultActiveKey="headers"
        activeKey={props.active}
        onChange={props.onChange}
      >
        <TabPane
          tab={<CountTab title="Headers" count={props.headersLength} />}
          key="headers"
        >
          <HeadersEditor />
        </TabPane>
        <TabPane
          tab={<CountTab title="Query" count={props.queryLength} />}
          key="query"
        >
          <QueryEditor />
        </TabPane>
        <TabPane tab="Body" key="body">
          <BodyEditor />
        </TabPane>
        <TabPane tab="Auth" key="auth">
          <Auth />
        </TabPane>
        <TabPane tab="Settings" key="settings">
          <Settings />
        </TabPane>
      </Tabs>
    </div>
  );
};
export default connector(Editors);
