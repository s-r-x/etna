import React from "react";
import { TProviderProps } from "../provider";
import ImageRenderer from "./Image";
import TextRenderer from "./Text";
import PdfRenderer from "./Pdf";

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
>;

const BodyRenderer = (props: TProps) => {
  if (props.isImage) {
    return <ImageRenderer body={props.rawBody} />;
  }
  if (props.isPdf) {
    return <PdfRenderer document={props.rawBody} />;
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
};

export default BodyRenderer;
