import React from "react";
import SearchInput from "./SearchInput";
import List from "./List";
import { TProviderProps, provide } from "./provider";

const HttpRequestHistory = (props: TProviderProps) => {
  return (
    <div>
      <SearchInput search={props.search} changeSearch={props.changeSearch} />
      <List history={props.history} />
    </div>
  );
};
export default provide(HttpRequestHistory);
