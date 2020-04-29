import React from "react";
import List from "./List";
import Form from "./Form";
import { TProviderProps, provide } from "./provider";

const HttpRequestHistory = (props: TProviderProps) => {
  return (
    <div>
      <Form
        searchForm={props.searchForm}
        updateSearchForm={props.updateSearchForm}
      />
      <List history={props.history} />
    </div>
  );
};
export default provide(HttpRequestHistory);
