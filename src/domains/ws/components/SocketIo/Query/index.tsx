import React from "react";
import KeyValueEditor from "@/components/KeyValueEditor";
import { useDispatch, useSelector } from "react-redux";
import { SocketIOSelectors as Selectors } from "@/domains/ws/store/SocketIO/selectors";
import { SocketIOActions as Actions } from "@/domains/ws/store/SocketIO/slice";

const SocketIoQueryEditor = () => {
  const dispatch = useDispatch();
  const query = useSelector(Selectors.getQuery);
  return (
    <KeyValueEditor
      onChangeKey={(e) => dispatch(Actions.changeQueryKey(e))}
      onChangeValue={(e) => dispatch(Actions.changeQueryValue(e))}
      onAdd={() => dispatch(Actions.addQuery())}
      onRemove={(e) => dispatch(Actions.removeQuery(e))}
      items={query}
    />
  );
};
export default SocketIoQueryEditor;
