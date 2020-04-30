import React from "react";
import Tabs from "./Tabs";
import HeadersEditor from "./HeadersEditor";
import QueryEditor from "./QueryEditor";
import BodyEditor from "./BodyEditor";
import AuthEditor from "./AuthEditor";
import cls from "./index.less";

const HttpRequestOpts = () => {
  return (
    <div className={cls.container}>
      <Tabs
        AuthEditor={<AuthEditor />}
        QueryEditor={<QueryEditor />}
        BodyEditor={<BodyEditor />}
        HeadersEditor={<HeadersEditor />}
      />
    </div>
  );
};
export default HttpRequestOpts;
