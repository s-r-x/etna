import React from "react";
import CodeEditor from "@/domains/code-editor/components";
import FullParentHeight from "@/components/FullParentHeight";
import { useDispatch, useSelector } from "react-redux";
import { SocketIOSelectors as Selectors } from "@socket-io/store/selectors";
import { SocketIOActions as Actions } from "@socket-io/store/slice";

const SocketIoOptions = () => {
  const options = useSelector(Selectors.getOptionsString);
  const dispatch = useDispatch();
  return (
    <div style={{ flex: 1, position: "relative" }}>
      <FullParentHeight>
        <CodeEditor
          mode="application/json"
          value={options}
          onChange={v => dispatch(Actions.changeOptions(v))}
        />
      </FullParentHeight>
    </div>
  );
};

export default SocketIoOptions;
