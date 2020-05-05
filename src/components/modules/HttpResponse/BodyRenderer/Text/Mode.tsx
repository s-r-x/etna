import React from "react";
import { Radio } from "antd";
import { TProviderProps } from "../../provider";
import { TBodyFormatMode } from "@/typings/store/httpResponse";

type TProps = Pick<
  TProviderProps,
  "editorOpts" | "changeEditorFormat" | "isPrettyBodySupported"
>;
const BodyViewerMode = (props: TProps) => {
  const { format } = props.editorOpts;
  return (
    <Radio.Group
      style={{ marginBottom: "10px" }}
      value={format}
      onChange={({ target }) =>
        props.changeEditorFormat(target.value as TBodyFormatMode)
      }
    >
      {props.isPrettyBodySupported && (
        <Radio.Button value="Pretty">Pretty</Radio.Button>
      )}
      <Radio.Button value="Raw">Raw</Radio.Button>
      <Radio.Button value="Preview">Preview</Radio.Button>
    </Radio.Group>
  );
};

export default BodyViewerMode;
