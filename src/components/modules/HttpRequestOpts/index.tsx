import React from "react";
import Tabs from "./Tabs";
import HeadersEditor from "./HeadersEditor";
import QueryEditor from "./QueryEditor";
import BodyEditor from "./BodyEditor";

const HttpRequestOpts = () => {
  return (
    <div>
      <Tabs
        QueryEditor={<QueryEditor />}
        BodyEditor={<BodyEditor />}
        HeadersEditor={<HeadersEditor />}
      />
    </div>
  );
};
export default HttpRequestOpts;
