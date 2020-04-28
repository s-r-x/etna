import React from "react";
import { Input } from "antd";
import { TProviderProps } from "../provider";
const { Search } = Input;

type TProps = Pick<TProviderProps, "changeSearch" | "search">;
const SearchInput = (props: TProps) => {
  return (
    <div>
      <Search
        value={props.search}
        size="large"
        allowClear
        onChange={(e) => props.changeSearch(e.target.value)}
        enterButton
      />
    </div>
  );
};
export default SearchInput;
