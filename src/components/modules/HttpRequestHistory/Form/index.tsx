import React, { useCallback } from "react";
import { Input } from "antd";
import { TProviderProps } from "../provider";
import { Form, Select } from "antd";
import { HTTP_METHODS } from "@/misc/http";
import _ from "lodash";
const { Search } = Input;
import { AutoComplete } from "antd";
import { HTTP_STATUS_CODES } from "@/misc/http";

const statusSelectOpts = HTTP_STATUS_CODES.map((code) => ({
  value: "" + code.value,
  label: `${code.value} (${code.hr})`,
}));

type TProps = Pick<TProviderProps, "searchForm" | "updateSearchForm">;
const HistorySearchForm = (props: TProps) => {
  const onChange = useCallback(
    _.debounce((changed: { [key: string]: any }) => {
      props.updateSearchForm(changed);
    }, 175),
    [props.searchForm]
  );
  return (
    <div>
      <Form
        labelCol={{
          span: 4,
        }}
        size="large"
        onValuesChange={onChange}
        initialValues={props.searchForm}
      >
        <Form.Item label="URL" name="url">
          <Search placeholder="URL" allowClear />
        </Form.Item>
        <Form.Item label="Method" name="method">
          <Select allowClear>
            {HTTP_METHODS.map((method) => (
              <Select.Option key={method} value={method}>
                {method}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Status" name="status">
          <AutoComplete
            options={statusSelectOpts}
            filterOption={(input, opt) => opt.value.startsWith(input)}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
export default HistorySearchForm;
