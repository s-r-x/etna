import React from "react";
import { List, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { PhoenixSelectors as Selectors } from "@phoenix/store/selectors";
import { PhoenixActions as Actions } from "@phoenix/store/slice";
import { TStorePhoenixChannelWithConn } from "../../../typings/store";

const ChannelsList = () => {
  const list = useSelector(Selectors.getChannels);
  const isSocketConnected = useSelector(Selectors.isConnected);
  const dispatch = useDispatch();
  const onConnClick = (ch: TStorePhoenixChannelWithConn) => {
    if (ch.connected) {
      dispatch(Actions.disconnectChannel(ch.topic));
    } else {
      const params = ch.query.reduce((acc, { key, value }) => {
        return { ...acc, [key]: value };
      }, {} as TStringDict);
      dispatch(Actions.connectChannel({ topic: ch.topic, params }));
    }
  };
  return (
    <List
      dataSource={list}
      renderItem={ch => (
        <List.Item
          actions={[
            <Button
              disabled={!isSocketConnected}
              type="primary"
              danger={ch.connected}
              key="conn"
              onClick={() => onConnClick(ch)}
            >
              {ch.connected ? "Disconnect" : "Connect"}
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
