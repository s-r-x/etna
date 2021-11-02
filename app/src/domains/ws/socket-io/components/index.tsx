import React from "react";
import ConnectForm from "./ConnectForm";
import MessageForm from "./MessageForm";
import QueryEditor from "./Query";
import HeadersEditor from "./Headers";
import Options from "./Options";
import FullHeightCard from "@/components/atoms/FullHeightCard";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SocketIOSelectors as Selectors } from "@socket-io/store/selectors";
import { SocketIOActions as Actions } from "@socket-io/store/slice";
const { TabPane } = Tabs;

const SocketIoRequest = () => {
  const tab = useSelector(Selectors.getTab);
  const dispatch = useDispatch();
  return (
    <FullHeightCard>
      <ConnectForm />
      <Tabs
        onChange={(tab) => dispatch(Actions.changeTab(tab))}
        activeKey={tab}
        destroyInactiveTabPane
        defaultActiveKey="message"
      >
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
          <Options />
        </TabPane>
      </Tabs>
    </FullHeightCard>
  );
};
export default SocketIoRequest;
