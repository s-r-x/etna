import React from "react";
import { Modal } from "antd";
import { connect, ConnectedProps } from "react-redux";
import { SettingsSelectors } from "../store/selectors";
import { close, changeActiveTab } from "../store/slice";
import CodeEditor from "./CodeEditor";
import { Tabs } from "antd";
import Shortcuts from "./Shortcuts";
import { ShortcutsSelectors } from "@/domains/shortcuts/store/selectors";
const { TabPane } = Tabs;

const connector = connect(
  state => ({
    isOpen: SettingsSelectors.isOpen(state),
    isShortcutEditorOpen: ShortcutsSelectors.isEditorOpen(state),
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
      keyboard={!props.isShortcutEditorOpen}
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
        <TabPane tab="Shortcuts" key="shortcuts">
          <Shortcuts />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default connector(SettingsModal);
