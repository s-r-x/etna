import React from "react";
import { Radio } from "antd";
import { TConnectorProps } from "../../../connectors";
import { TBodyFormatMode } from "@/domains/http-res/typings/store";

type TProps = Pick<
  TConnectorProps,
  "editorOpts" | "changeEditorFormat" | "isPrettyBodySupported"
>;
const BodyViewerMode = (props: TProps) => {
  return (
    <Radio.Group
      size="small"
      value={props.editorOpts.format}
      onChange={({ target }) =>
        props.changeEditorFormat(target.value as TBodyFormatMode)
      }
    >
      {props.isPrettyBodySupported && (
        <Radio.Button value="Pretty">Pretty</Radio.Button>
      )}
      <Radio.Button value="Raw">Raw</Radio.Button>
    </Radio.Group>
  );
};

export default BodyViewerMode;
