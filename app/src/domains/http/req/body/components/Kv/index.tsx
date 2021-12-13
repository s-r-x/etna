import React from "react";
import KVEditor from "@/components/KeyValueEditor";
import { HttpReqBodySelectors as Selectors } from "../../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { HttpReqBodyActions as Actions } from "../../store/slice";
import { TEnhancedKeyValue } from "../../typings/store";
import { Input, Tooltip, Tag } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import * as S from "./styled";
import _ from "lodash";
import { WebApi } from "@/utils/webapi";

const connector = connect(
  (state: TRootState) => ({
    items: Selectors.getKV(state),
    mime: Selectors.getMIME(state),
  }),
  {
    addKV: Actions.addKV,
    changeKVActive: Actions.changeKVActive,
    changeKVValue: Actions.changeKVValue,
    changeKVKey: Actions.changeKVKey,
    removeKV: Actions.removeKV,
  }
);
type TConnectorProps = ConnectedProps<typeof connector>;

const BodyKVEditor = (props: TConnectorProps) => {
  const valueRenderer = ({
    placeholder,
    row,
    id,
  }: {
    row: TEnhancedKeyValue;
    id: any;
    placeholder: string;
  }) => {
    const fileUploadId = "kv-add-file-" + id;
    const onFileUpload = async ({
      target,
    }: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(target.files);
      if (_.isEmpty(files)) return;
      const file = files[0];
      const b64 = await WebApi.fileToBase64(file);
      props.changeKVValue({
        id,
        isFile: true,
        fileName: file.name,
        mime: file.type,
        value: b64,
      });
    };
    const onFileRemove = () => {
      props.changeKVValue({
        id,
        isFile: undefined,
        fileName: undefined,
        mime: undefined,
        value: "",
      });
    };
    return (
      <>
        {!row.isFile ? (
          <Input
            placeholder={placeholder}
            value={row.value}
            onChange={e =>
              props.changeKVValue({
                id,
                value: e.target.value,
                mime: undefined,
                isFile: false,
                fileName: undefined,
              })
            }
          />
        ) : (
          <Tag closable onClose={onFileRemove}>
            {row.fileName}
          </Tag>
        )}
        {props.mime === "multipart/form-data" && (
          <Tooltip title="Add file">
            <S.UploadInput
              onChange={onFileUpload}
              id={fileUploadId}
              type="file"
            />
            <label
              aria-label="add file"
              className="ant-btn ant-btn-circle ant-btn-icon-only"
              htmlFor={fileUploadId}
            >
              <PaperClipOutlined />
            </label>
          </Tooltip>
        )}
      </>
    );
  };
  return (
    <KVEditor
      items={props.items}
      onAdd={props.addKV}
      onChangeValue={props.changeKVValue}
      onChangeKey={props.changeKVKey}
      onRemove={props.removeKV}
      onChangeActive={props.changeKVActive}
      valueRenderer={valueRenderer}
    />
  );
};

export default connector(BodyKVEditor);
