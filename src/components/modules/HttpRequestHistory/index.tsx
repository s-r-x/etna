import React from "react";
import List from "./List";
import Form from "./Form";
import { TProviderProps, provide } from "./provider";

const HttpRequestHistory = (props: TProviderProps) => {
  return (
    <>
      <Form
        searchForm={props.searchForm}
        updateSearchForm={props.updateSearchForm}
      />
      <List
        restoreRequest={props.restoreRequest}
        removeItem={props.removeItem}
        history={props.history}
      />
    </>
  );
};
export default provide(HttpRequestHistory);
