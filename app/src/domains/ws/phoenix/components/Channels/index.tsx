import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { PhoenixActions as Actions } from "@phoenix/store/slice";
import CreateChannelModal from "./CreateChannelModal";
import ChannelsList from "./ChannelsList";

const PhoenixChannels = () => {
  const dispatch = useDispatch();
  return (
    <>
      <CreateChannelModal />
      <div>
        <Button
          onClick={() => dispatch(Actions.openChForm())}
          htmlType="submit"
          type="primary"
          icon={<PlusOutlined />}
        >
          New channel
        </Button>
        <ChannelsList />
      </div>
    </>
  );
};
export default PhoenixChannels;
