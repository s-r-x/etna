import React from "react";
import { Tabs } from "antd";
import { TConnectorProps, connector } from "../../connectors/tabs";
import HeadersEditor from "../Headers";
import QueryEditor from "../Query";
import BodyEditor from "@/domains/http-req-body/components";
import Auth from "../Auth";
import Settings from "../Settings";
import CountTab from "@/components/atoms/CountTab";
import History from "@/domains/http-req-history/components";
import BodyTab from "./BodyTab";
const { TabPane } = Tabs;

const Editors = (props: TConnectorProps) => {
  return (
    <Tabs
      destroyInactiveTabPane
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
      <TabPane
        tab={
          <BodyTab
            mime={props.mime}
            changeMime={props.changeMime}
            isActive={props.active === "body"}
          />
        }
        key="body"
      >
        <BodyEditor />
      </TabPane>
      <TabPane tab="Auth" key="auth">
        <Auth />
      </TabPane>
      <TabPane tab="Settings" key="settings">
        <Settings />
      </TabPane>
      <TabPane tab="History" key="history">
        <History />
      </TabPane>
    </Tabs>
  );
};
export default connector(Editors);
