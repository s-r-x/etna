import DropdownTab from "@/components/atoms/DropdownTab";
import FullHeightCard from "@/components/atoms/FullHeightCard";
import KeyValueEditor from "@/components/KeyValueEditor";
import { Button, Input, Menu, Badge, List } from "antd";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PhoenixSelectors } from "@phoenix/store/selectors";
import { PhoenixActions as Actions } from "@phoenix/store/slice";

const ConnTab = (props: {
  disabled: boolean;
  active: string;
  onClick: (key: string) => void;
  isConnected: boolean;
}) => {
  const menu = useCallback(() => {
    return (
      <Menu
        selectedKeys={[props.active]}
        onClick={({ key }) => props.onClick(key as string)}
      >
        <Menu.Item key="main">Connection</Menu.Item>
        <Menu.Item key="query">Query</Menu.Item>
      </Menu>
    );
  }, []);
  return (
    <DropdownTab
      title={
        <Badge
          offset={[0, 4]}
          dot
          status={props.isConnected ? "success" : "error"}
        >
          Connection
        </Badge>
      }
      disabled={props.disabled}
      menu={menu}
    />
  );
};
const PhoenixModule = () => {
  const dispatch = useDispatch();
  const isConnected = useSelector(PhoenixSelectors.isConnected);
  const tab = useSelector(PhoenixSelectors.getTab);
  const url = useSelector(PhoenixSelectors.getUrl);
  const connTab = useSelector(PhoenixSelectors.getConnTab);
  const chForm = useSelector(PhoenixSelectors.getCreateChannelForm);
  const channels = useSelector(PhoenixSelectors.getChannels);
  const query = useSelector(PhoenixSelectors.getQuery);
  return (
    <FullHeightCard
      activeTabKey={tab}
      onTabChange={(tab) => dispatch(Actions.changeTab(tab))}
      tabList={[
        {
          key: "conn",
          tab: (
            <ConnTab
              isConnected={isConnected}
              active={connTab}
              onClick={(key) => dispatch(Actions.changeConnTab(key))}
              disabled={tab !== "conn"}
            />
          ),
        },
        {
          key: "msg",
          tab: "Message",
        },
        {
          key: "ch",
          tab: "Channels",
        },
      ]}
    >
      {tab === "conn" && (
        <>
          {connTab === "query" && (
            <KeyValueEditor
              items={query}
              onChangeKey={(e) => dispatch(Actions.changeQueryKey(e))}
              onChangeValue={(e) => dispatch(Actions.changeQueryValue(e))}
              onAdd={() => dispatch(Actions.addQuery())}
              onRemove={(e) => dispatch(Actions.removeQuery(e))}
            />
          )}
          {connTab === "main" && (
            <div style={{ display: "flex" }}>
              <Input
                value={url}
                onChange={({ target }) =>
                  dispatch(Actions.changeUrl(target.value))
                }
              />
              <Button
                onClick={() =>
                  isConnected
                    ? dispatch(Actions.disconnect())
                    : dispatch(Actions.connect())
                }
              >
                {isConnected ? "Disconnect" : "Connect"}
              </Button>
            </div>
          )}
        </>
      )}
      {tab === "msg" && <div>message here</div>}
      {tab === "ch" && (
        <div>
          <div style={{ display: "flex" }}>
            <Input
              value={chForm.topic}
              onChange={({ target }) =>
                dispatch(
                  Actions.updateCreateChannelForm({ topic: target.value })
                )
              }
            />
            <Button
              onClick={() => dispatch(Actions.createChannel())}
              disabled={!chForm.topic}
            >
              Create
            </Button>
          </div>
          <List
            rowKey="topic"
            dataSource={channels}
            renderItem={(ch) => (
              <List.Item
                actions={[
                  <Button
                    disabled={!isConnected}
                    type="primary"
                    danger={ch.isConnected}
                    onClick={() =>
                      dispatch(
                        ch.isConnected
                          ? Actions.disconnectChannel(ch.topic)
                          : Actions.connectChannel(ch.topic)
                      )
                    }
                    key="conn"
                  >
                    {ch.isConnected ? "Disconnect" : "Connect"}
                  </Button>,
                  <Button
                    onClick={() => dispatch(Actions.removeChannel(ch.topic))}
                    disabled={ch.isConnected}
                    type="primary"
                    key="key"
                    danger
                  >
                    Remove
                  </Button>,
                ]}
              >
                <List.Item.Meta title={ch.topic}></List.Item.Meta>
              </List.Item>
            )}
          />
        </div>
      )}
    </FullHeightCard>
  );
};

export default PhoenixModule;
