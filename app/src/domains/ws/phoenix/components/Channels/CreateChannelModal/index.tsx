import React from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PhoenixSelectors as Selectors } from "@phoenix/store/selectors";
import { PhoenixActions as Actions } from "@phoenix/store/slice";
import KeyValueEditor from "@/components/KeyValueEditor";
import { Input } from "antd";

const CreateChannelModal = () => {
  const dispatch = useDispatch();
  const query = useSelector(Selectors.getChannelFormQuery);
  const topic = useSelector(Selectors.getChannelFormTopic);
  const isOpen = useSelector(Selectors.isChannelFormOpen);
  const onSubmit = () => {
    dispatch(Actions.createChannel());
    dispatch(Actions.closeChForm());
    dispatch(Actions.clearChForm());
  };
  return (
    <Modal
      onCancel={() => dispatch(Actions.closeChForm())}
      title="Create channel"
      okButtonProps={{
        disabled: !topic,
      }}
      onOk={onSubmit}
      visible={isOpen}
    >
      <Input
        placeholder="Topic"
        value={topic}
        onChange={({ target }) =>
          dispatch(Actions.changeChFormTopic(target.value))
        }
        style={{
          marginBottom: "15px",
        }}
      />
      <KeyValueEditor
        onChangeKey={e => dispatch(Actions.changeChFormQueryKey(e))}
        onChangeValue={e => dispatch(Actions.changeChFormQueryValue(e))}
        onAdd={() => dispatch(Actions.addChFormQuery())}
        onRemove={e => dispatch(Actions.removeChFormQuery(e))}
        addTitle="Add param"
        items={query}
      />
    </Modal>
  );
};
export default CreateChannelModal;
