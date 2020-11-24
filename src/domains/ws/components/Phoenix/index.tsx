import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PhoenixSelectors } from "../../store/Phoenix/selectors";
import { PhoenixActions } from "../../store/Phoenix/slice";

const PhoenixModule = () => {
  const dispatch = useDispatch();
  const isConnected = useSelector(PhoenixSelectors.isConnected);
  return (
    <div>
      <Button
        onClick={() =>
          isConnected
            ? dispatch(PhoenixActions.disconnect())
            : dispatch(PhoenixActions.connect())
        }
      >
        {isConnected ? "Disconnect" : "Connect"}
      </Button>
    </div>
  );
};

export default PhoenixModule;
