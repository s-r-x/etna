import React from "react";
import List from "./List";
import Form from "./Form";
import { connector, TConnectorProps } from "../connectors";

const HttpRequestHistory = (props: TConnectorProps) => {
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
export default connector(HttpRequestHistory);
