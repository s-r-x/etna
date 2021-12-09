import React from "react";
import KeyValueEditor from "@/components/KeyValueEditor";
import { useDispatch, useSelector } from "react-redux";
import { PhoenixSelectors as Selectors } from "@phoenix/store/selectors";
import { PhoenixActions as Actions } from "@phoenix/store/slice";

const PhoenixQueryEditor = () => {
  const dispatch = useDispatch();
  const query = useSelector(Selectors.getQuery);
  return (
    <KeyValueEditor
      onChangeKey={e => dispatch(Actions.changeQueryKey(e))}
      onChangeValue={e => dispatch(Actions.changeQueryValue(e))}
      onAdd={() => dispatch(Actions.addQuery())}
      onRemove={e => dispatch(Actions.removeQuery(e))}
      items={query}
    />
  );
};
export default PhoenixQueryEditor;
