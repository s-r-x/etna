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
import { Container } from "./styled";
const { TabPane } = Tabs;

const Editors = (props: TConnectorProps) => {
  return (
    <Container>
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
        <TabPane tab="History" key="history">
          <History />
        </TabPane>
      </Tabs>
    </Container>
  );
};
export default connector(Editors);
