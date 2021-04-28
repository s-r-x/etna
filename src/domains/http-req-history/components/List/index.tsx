import React, { useMemo } from "react";
import Item from "./Item";
import { TConnectorProps } from "../../connectors";
import { FixedSizeList as VirtualList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Empty } from "antd";

type TProps = Pick<TConnectorProps, "history" | "removeItem" | "restore">;
const SearchList = (props: TProps) => {
  if (props.history.length === 0) {
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Empty history" />
    );
  }
  const itemProps = useMemo(() => {
    return {
      history: props.history,
      removeItem: props.removeItem,
      restore: props.restore,
    };
  }, [props.history, props.removeItem, props.restore]);
  return (
    <div style={{ flex: 1 }}>
      <AutoSizer>
        {({ width, height }) => {
          return (
            <VirtualList
              itemData={itemProps}
              width={width}
              height={height}
              itemSize={75}
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
