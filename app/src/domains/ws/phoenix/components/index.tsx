import FullHeightCard from "@/components/atoms/FullHeightCard";
import React from "react";
import ConnectForm from "./ConnectForm";
import MessageForm from "./MessageForm";
import Channels from "./Channels";
import { Tabs } from "antd";
import QueryEditor from "./Query";
import { useDispatch, useSelector } from "react-redux";
import { PhoenixSelectors as Selectors } from "@phoenix/store/selectors";
import { PhoenixActions as Actions } from "@phoenix/store/slice";
const { TabPane } = Tabs;

const PhoenixModule = () => {
  const tab = useSelector(Selectors.getTab);
  const dispatch = useDispatch();
  return (
    <FullHeightCard>
      <ConnectForm />
      <Tabs
        activeKey={tab}
        onChange={tab => dispatch(Actions.changeTab(tab))}
        destroyInactiveTabPane
        defaultActiveKey="message"
      >
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
