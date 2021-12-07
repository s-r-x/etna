import React from "react";
import ConnectForm from "./ConnectForm";
import MessageForm from "./MessageForm";
import FullHeightCard from "@/components/atoms/FullHeightCard";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { WsRawSelectors as Selectors } from "@ws/raw/store/selectors";
import { WsRawActions as Actions } from "@ws/raw/store/slice";
import Protocols from "./Protocols";
const { TabPane } = Tabs;

const WsRawRequest = () => {
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
        <TabPane tab="Protocols" key="protocols">
          <Protocols />
        </TabPane>
      </Tabs>
    </FullHeightCard>
  );
};
export default WsRawRequest;
