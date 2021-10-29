import FullHeightCard from "@/components/atoms/FullHeightCard";
import React from "react";
import ConnectForm from "./ConnectForm";
import MessageForm from "./MessageForm";
import Channels from "./Channels";
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
        <TabPane tab="Channels" key="channels">
          <Channels />
        </TabPane>
      </Tabs>
    </FullHeightCard>
  );
};

export default PhoenixModule;
