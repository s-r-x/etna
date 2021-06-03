import React from "react";
import { Modal } from "antd";
import { connect, ConnectedProps } from "react-redux";
import { SettingsSelectors } from "../store/selectors";
import { close, changeActiveTab } from "../store/slice";
import CodeEditor from "./CodeEditor";
import Proxy from "./Proxy";
import { Tabs } from "antd";
const { TabPane } = Tabs;

const connector = connect(
  (state) => ({
    isOpen: SettingsSelectors.isOpen(state),
    activeTab: SettingsSelectors.getActiveTab(state),
  }),
  {
    changeActiveTab,
    close,
  }
);
const SettingsModal = (props: ConnectedProps<typeof connector>) => {
  return (
    <Modal
      footer={null}
      onCancel={props.close}
      title="Settings"
      visible={props.isOpen}
    >
      <Tabs
        onChange={props.changeActiveTab}
        activeKey={props.activeTab}
        destroyInactiveTabPane
      >
        <TabPane tab="Text editor" key="textEditor">
          <CodeEditor />
        </TabPane>
        <TabPane tab="Proxy" key="proxy">
          <Proxy />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default connector(SettingsModal);
