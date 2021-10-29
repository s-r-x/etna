import React from "react";
import { List, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { PhoenixSelectors as Selectors } from "@phoenix/store/selectors";
import { PhoenixActions as Actions } from "@phoenix/store/slice";

const ChannelsList = () => {
  const list = useSelector(Selectors.getChannels);
  const dispatch = useDispatch();
  return (
    <List
      dataSource={list}
      renderItem={(ch) => (
        <List.Item
          actions={[
            <Button type="primary" danger={ch.isConnected} key="conn">
              {ch.isConnected ? "Disconnect" : "Connect"}
            </Button>,
            <Button
              key="rm"
							type="primary"
							danger
              onClick={() => dispatch(Actions.removeChannel(ch.topic))}
            >
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta title={ch.topic} />
        </List.Item>
      )}
    />
  );
};
export default ChannelsList;
