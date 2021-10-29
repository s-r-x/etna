import FullHeightCard from "@/components/atoms/FullHeightCard";
import React from "react";
import ConnectForm from "./ConnectForm";
import MessageForm from "./MessageForm";
import { Tabs } from "antd";
import QueryEditor from "./Query";
const { TabPane } = Tabs;

const PhoenixModule = () => {
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
        <TabPane tab="Settings" key="settings">
          settings here
        </TabPane>
      </Tabs>
    </FullHeightCard>
  );
};

export default PhoenixModule;
