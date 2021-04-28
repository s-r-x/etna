import React from "react";
import ConnectForm from "./ConnectForm";
import MessageForm from "./MessageForm";
import QueryEditor from "./Query";
import HeadersEditor from "./Headers";
import FullHeightCard from "@/components/atoms/FullHeightCard";
import { Tabs } from "antd";
const { TabPane } = Tabs;

const SocketIoRequest = () => {
  return (
    <FullHeightCard>
      <ConnectForm />
      <Tabs destroyInactiveTabPane defaultActiveKey="message">
        <TabPane tab="Message" key="message">
          <MessageForm />
        </TabPane>
        <TabPane tab="Query" key="query">
          <QueryEditor />
        </TabPane>
        <TabPane tab="Headers" key="headers">
          <HeadersEditor />
        </TabPane>
        <TabPane tab="Settings" key="settings">
          settings here
        </TabPane>
      </Tabs>
    </FullHeightCard>
  );
};
export default SocketIoRequest;
