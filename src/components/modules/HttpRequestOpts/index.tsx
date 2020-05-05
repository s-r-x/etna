import React from "react";
import Tabs from "./Tabs";
import HeadersEditor from "./HeadersEditor";
import QueryEditor from "./QueryEditor";
import BodyEditor from "./BodyEditor";
import AuthEditor from "./AuthEditor";
import Settings from "./Settings";
import cls from "./index.less";

const HttpRequestOpts = () => {
  return (
    <div className={cls.container}>
      <Tabs
        AuthEditor={<AuthEditor />}
        QueryEditor={<QueryEditor />}
        BodyEditor={<BodyEditor />}
        HeadersEditor={<HeadersEditor />}
        Settings={<Settings />}
      />
    </div>
  );
};
export default HttpRequestOpts;
