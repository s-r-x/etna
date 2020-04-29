import React, { useMemo } from "react";
import Item from "./Item";
import { TProviderProps } from "../provider";
import { FixedSizeList as VirtualList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Empty } from "antd";

type TProps = Pick<TProviderProps, "history">;
const SearchList = (props: TProps) => {
  if (props.history.length === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }
  const itemProps = useMemo(() => {
    return { history: props.history };
  }, [props.history]);
  return (
    <div style={{ flex: 1 }}>
      <AutoSizer>
        {({ width, height }) => {
          return (
            <VirtualList
              itemData={itemProps}
              width={width}
              height={height}
              itemSize={85}
              itemCount={props.history.length}
            >
              {Item}
            </VirtualList>
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default SearchList;
