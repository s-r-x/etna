import React, { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

const BodyEditor = () => {
  const [body, setBody] = useState("");
  return (
    <div>
      <p>body editor</p>
      <CodeEditor mode="javascript" value={body} onChange={setBody} />
    </div>
  );
};
export default BodyEditor;
