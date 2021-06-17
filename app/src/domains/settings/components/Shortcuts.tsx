import React, { useEffect } from "react";
import { ShortcutsSelectors as Selectors } from "@/domains/shortcuts/store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { List, Button, Modal } from "antd";
import {
  addShortcut,
  removeShortcut,
  openEditor,
  closeEditor,
  setEditorPressedCombo,
} from "@/domains/shortcuts/store/slice";
import { PlusOutlined } from "@ant-design/icons";
import _ from "lodash";

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
    setEditorPressedCombo,
  }
);

type TProps = ConnectedProps<typeof connector>;
const Shortcuts = (props: TProps) => {
  return (
    <>
      <List
        dataSource={props.shortcuts}
        renderItem={({ eventHr, shortcuts, event }) => (
          <List.Item
            actions={[
              shortcuts.map((s) => (
                <Button
                  onClick={() => props.openEditor({ event, key: s })}
                  size="small"
                  type="dashed"
                  key={s}
                >
                  {s}
                </Button>
              )),
              <Button
                size="small"
                key="add"
                type="primary"
                shape="circle"
                onClick={() => props.openEditor({ event, key: null })}
                icon={<PlusOutlined />}
              />,
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
        setPressedCombo={props.setEditorPressedCombo}
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
  setPressedCombo: TProps["setEditorPressedCombo"];
  addShortcut: TProps["addShortcut"];
  removeShortcut: TProps["removeShortcut"];
  event: TProps["editorEvent"];
};
const AddShortcutModal = (props: TModalProps) => {
  useEffect(() => {
    if (props.isOpen) {
      let pressed: string[] = [];
      const upListener = (_e: KeyboardEvent) => {
        if (!_.isEmpty(pressed)) {
          if (_.isEqual(["escape"], pressed)) {
            return props.onClose();
          }
        }
        pressed = [];
      };
      const normalizeKey = (rawKey: string) => {
        const key = rawKey.toLowerCase();
        const specialKeyMapping = {
          control: "ctrl",
          " ": "space",
        };
        return key in specialKeyMapping ? specialKeyMapping[key] : key;
      };
      const downListener = (e: KeyboardEvent) => {
        console.log(e);
        e.preventDefault();
        pressed.push(normalizeKey(e.key));
        pressed = _.uniq(pressed);
        pressed.sort((a, b) => {
          if (a === "shift") {
            return 1;
          }
          if (a === "ctrl") {
            return b === "shift" ? -1 : 1;
          }
          return 0;
        });
        props.setPressedCombo(pressed);
      };
      document.addEventListener("keydown", downListener);
      document.addEventListener("keyup", upListener);
      return () => {
        document.removeEventListener("keydown", downListener);
        document.removeEventListener("keyup", upListener);
      };
    }
  }, [props.isOpen]);
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
