import React from "react";
import Item from "./Item";
import { TProviderProps } from "../provider";

type TProps = Pick<TProviderProps, "history">;
const SearchList = (props: TProps) => {
  return (
    <ul>
      {props.history.map((item) => (
        <Item key={item.id}></Item>
      ))}
    </ul>
  );
};

export default SearchList;
