import React from "react";
import KeyValueEditor from "@/components/KeyValueEditor";
import { useDispatch, useSelector } from "react-redux";
import { SocketIOSelectors as Selectors } from "@/domains/ws/store/SocketIO/selectors";
import { SocketIOActions as Actions } from "@/domains/ws/store/SocketIO/slice";

const SocketIoHeadersEditor = () => {
  const headers = useSelector(Selectors.getHeaders);
  const dispatch = useDispatch();
  return (
    <KeyValueEditor
      keyPlaceholder="Header"
      onChangeActive={(e) => dispatch(Actions.changeHeaderActive(e))}
      onChangeValue={(e) => dispatch(Actions.changeHeaderValue(e))}
      onChangeKey={(e) => dispatch(Actions.changeHeaderKey(e))}
      onAdd={() => dispatch(Actions.addHeader())}
      onRemove={(e) => dispatch(Actions.removeHeader(e))}
      items={headers}
    />
  );
};
export default SocketIoHeadersEditor;
