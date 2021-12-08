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
        restore={props.restore}
        removeItem={props.removeItem}
        history={props.history}
      />
    </>
  );
};
export default connector(HttpRequestHistory);
