import Spin from "@/components/Spin";
import React from "react";
import { TCodeEditorProps } from "../typings/props";
const CodeEditorLoadable = React.lazy(
  () => import(/* webpackPrefetch: true */ "./main")
);

const CodeEditor = (props: TCodeEditorProps) => (
  <React.Suspense fallback={<Spin centered size="large" />}>
    <CodeEditorLoadable {...props} />
  </React.Suspense>
);
export default CodeEditor;
