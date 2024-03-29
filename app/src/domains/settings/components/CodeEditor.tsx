import React from "react";
import { Form, Radio, InputNumber, Select, Switch } from "antd";
import { CodeEditorSelectors } from "@/domains/code-editor/store/selectors";
import { connect, ConnectedProps } from "react-redux";
import {
  changeKeyMap,
  changeTabSize,
  changeTheme,
  toggleLineNumbers,
  toggleLineWrap,
  changeAutoCloseBrackets,
} from "@/domains/code-editor/store/slice";
const { Option } = Select;

const connector = connect(
  state => ({
    form: CodeEditorSelectors.getOptions(state),
  }),
  {
    changeAutoCloseBrackets,
    changeKeyMap,
    changeTabSize,
    changeTheme,
    toggleLineNumbers,
    toggleLineWrap,
  }
);
const CodeEditorSettings = (props: ConnectedProps<typeof connector>) => {
  const onChange = (changed: TAnyDict) => {
    for (const key in changed) {
      const val = changed[key];
      if (key === "keyMap") {
        props.changeKeyMap(val);
      } else if (key === "tabSize") {
        props.changeTabSize(val);
      } else if (key === "theme") {
        props.changeTheme(val);
      } else if (key === "lineNumbers") {
        props.toggleLineNumbers(val);
      } else if (key === "lineWrapping") {
        props.toggleLineWrap(val);
      } else if (key === "autoCloseBrackets") {
        props.changeAutoCloseBrackets(val);
      }
    }
  };
  return (
    <Form onValuesChange={onChange} initialValues={props.form}>
      <Form.Item label="Key mapping" name="keyMap">
        <Radio.Group>
          <Radio.Button value="vim">Vim</Radio.Button>
          <Radio.Button value="emacs">Emacs</Radio.Button>
          <Radio.Button value="sublime">Sublime</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tab size" name="tabSize">
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item label="Theme" name="theme">
        <Select>
          <Option value="material">Material</Option>
          <Option value="solarized">Solarized</Option>
          <Option value="dracula">Dracula</Option>
          <Option value="monokai">Monokai</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Line numbers"
        valuePropName="checked"
        name="lineNumbers"
      >
        <Switch />
      </Form.Item>
      <Form.Item label="Wrap lines" valuePropName="checked" name="lineWrapping">
        <Switch />
      </Form.Item>
      <Form.Item
        label="Autoclose brackets"
        valuePropName="checked"
        name="autoCloseBrackets"
      >
        <Switch />
      </Form.Item>
    </Form>
  );
};

export default connector(CodeEditorSettings);
