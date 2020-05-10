import React from "react";
import { TProviderProps } from "../provider";
import ImageRenderer from "./Image";
import TextRenderer from "./Text";
import PdfRenderer from "./Pdf";
import { Empty } from "antd";

type TProps = Pick<
  TProviderProps,
  | "editorOpts"
  | "prettyBody"
  | "rawBody"
  | "responseType"
  | "changeEditorFormat"
  | "isPrettyBodySupported"
  | "isImage"
  | "isPdf"
> & {
  isBinary: boolean;
};

const BodyRenderer = (props: TProps) => {
  if (props.isBinary) {
    if (props.isImage) {
      return <ImageRenderer body={props.rawBody} />;
    } else if (props.isPdf) {
      return <PdfRenderer document={props.rawBody} />;
    } else {
      return (
        <Empty description="Couldn't find appropriate renderer for this file format" />
      );
    }
  } else {
    if (props.isImage || props.isPdf) {
      return (
        <Empty description="Turn on 'Expect binary response' option to preview the response" />
      );
    }
    return (
      <TextRenderer
        editorOpts={props.editorOpts}
        prettyBody={props.prettyBody}
        rawBody={props.rawBody}
        responseType={props.responseType}
        changeEditorFormat={props.changeEditorFormat}
        isPrettyBodySupported={props.isPrettyBodySupported}
      />
    );
  }
};

export default BodyRenderer;
