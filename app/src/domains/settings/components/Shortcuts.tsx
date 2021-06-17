import React from "react";
import { ShortcutsSelectors as Selectors } from "@/domains/shortcuts/store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { List, Button, Modal } from "antd";
import {
  addShortcut,
  removeShortcut,
  openEditor,
  closeEditor,
} from "@/domains/shortcuts/store/slice";

const connector = connect(
  (state) => ({
    shortcuts: Selectors.getEventsForSettingsRender(state),
    isEditorOpen: Selectors.isEditorOpen(state),
    editorEvent: Selectors.getEditorEvent(state),
    pressedCombo: Selectors.getEditorPressedCombo(state),
  }),
  {
    addShortcut,
    removeShortcut,
    openEditor,
    closeEditor,
  }
);

type TProps = ConnectedProps<typeof connector>;
const Shortcuts = (props: TProps) => {
  return (
    <>
      <List
        dataSource={props.shortcuts}
        renderItem={({ eventHr, shortcut, event }) => (
          <List.Item
            actions={[
              <Button
                onClick={() =>
                  props.openEditor({ event, key: shortcut || null })
                }
                size="small"
                type="dashed"
                key="shortcut"
              >
                {shortcut || "Empty"}
              </Button>,
            ]}
          >
            <List.Item.Meta title={eventHr} />
          </List.Item>
        )}
      />
      <AddShortcutModal
        onClose={() => props.closeEditor()}
        isOpen={props.isEditorOpen}
        event={props.editorEvent}
        pressedCombo={props.pressedCombo}
        addShortcut={props.addShortcut}
        removeShortcut={props.removeShortcut}
      />
    </>
  );
};

type TModalProps = {
  isOpen: boolean;
  onClose: () => void;
  pressedCombo: TProps["pressedCombo"];
  addShortcut: TProps["addShortcut"];
  removeShortcut: TProps["removeShortcut"];
  event: TProps["editorEvent"];
};
const AddShortcutModal = (props: TModalProps) => {
  return (
    <Modal
      keyboard={false}
      title="Add shortcut"
      visible={props.isOpen}
      cancelText={props.pressedCombo ? "Remove" : "Cancel"}
      onCancel={() => {
        if (props.pressedCombo) {
          props.removeShortcut({
            event: props.event,
            key: props.pressedCombo,
          });
        }
        props.onClose();
      }}
      onOk={() => {
        if (props.pressedCombo) {
          props.addShortcut({
            event: props.event,
            key: props.pressedCombo,
          });
        }
        props.onClose();
      }}
    >
      {props.pressedCombo}
    </Modal>
  );
};

export default connector(Shortcuts);
