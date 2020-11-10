import React, { useMemo } from "react";
import Item from "./Item";
import { TConnectorProps } from "../../connectors";
import { FixedSizeList as VirtualList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Empty } from "antd";

type TProps = Pick<
  TConnectorProps,
  "history" | "removeItem" | "restoreRequest"
>;
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
      restoreRequest: props.restoreRequest,
    };
  }, [props.history, props.removeItem, props.restoreRequest]);
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
