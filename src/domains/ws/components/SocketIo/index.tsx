import React from "react";
import ConnectForm from "./ConnectForm";
import MessageForm from "./MessageForm";
import QueryEditor from "./Query";
import HeadersEditor from "./Headers";
import { connector, TConnectorProps } from "../../connectors/socket-io";
import FullHeightCard from "@/components/atoms/FullHeightCard";
import { Tabs } from "antd";
const { TabPane } = Tabs;

const SocketIoRequest = (props: TConnectorProps) => {
  return (
    <FullHeightCard>
      <ConnectForm
        path={props.path}
        disconnect={props.disconnect}
        isConnected={props.isConnected}
        connect={props.connect}
        url={props.url}
        changeUrl={props.changeUrl}
        changePath={props.changePath}
      />
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
export default connector(SocketIoRequest);
