import React from "react";
import ImageRenderer from "./Image";
import TextRenderer from "./Text";
import { Empty, Spin } from "antd";
import { TConnectorProps } from "../../connectors";
import SvgRenderer from "./Svg";
import VideoRenderer from "./Video";
const PdfRenderer = React.lazy(() => import("./Pdf"));

type TProps = Pick<
  TConnectorProps,
  | "editorOpts"
  | "prettyBody"
  | "rawBody"
  | "responseType"
  | "changeEditorFormat"
  | "isPrettyBodySupported"
  | "isImage"
  | "isPdf"
  | "isSvg"
  | "isVideo"
  | "isBinary"
>;

const BodyRenderer = (props: TProps) => {
  if (!props.rawBody) {
    return <Empty description="Empty response" />;
  }
  if (props.isSvg) {
    return <SvgRenderer svg={props.rawBody} />;
  }
  if (props.isBinary) {
    if (props.isImage) {
      return <ImageRenderer body={props.rawBody} />;
    } else if (props.isPdf) {
      return (
        <React.Suspense fallback={<Spin size="large" />}>
          <PdfRenderer document={props.rawBody} />
        </React.Suspense>
      );
    } else if (props.isVideo) {
      return <VideoRenderer body={props.rawBody} />;
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
