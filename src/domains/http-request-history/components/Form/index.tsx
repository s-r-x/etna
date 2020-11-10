import React, { useCallback } from "react";
import { Input } from "antd";
import { TConnectorProps } from "../../connectors";
import { Form } from "antd";
import _ from "lodash";
import Filters from "./Filters";
const { Search } = Input;

type TProps = Pick<TConnectorProps, "searchForm" | "updateSearchForm">;
const HistorySearchForm = (props: TProps) => {
  const onChange = useCallback(
    _.debounce((changed: TAnyDict) => {
      props.updateSearchForm(changed);
    }, 175),
    [props.searchForm]
  );
  return (
    <>
      <Form
        style={{
          marginBottom: "10px",
        }}
        labelCol={{
          span: 4,
        }}
        onValuesChange={onChange}
        initialValues={props.searchForm}
      >
        <Form.Item label="URL" name="url">
          <Search placeholder="URL" allowClear />
        </Form.Item>
        <Filters />
      </Form>
    </>
  );
};
export default HistorySearchForm;
