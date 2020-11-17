import React from "react";
import { Form, Select, Collapse, Radio, DatePicker } from "antd";
import { HTTP_METHODS } from "@/misc/http";
import { AutoComplete } from "antd";
import { HTTP_STATUS_CODES } from "@/misc/http";
import { SettingOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
const { Option } = Select;
const { RangePicker } = DatePicker;

const statusSelectOpts = HTTP_STATUS_CODES.map((code) => ({
  value: "" + code.value,
  label: `${code.value} (${code.hr})`,
}));

const HistorySearchFilters = () => {
  return (
    <Collapse>
      <Panel extra={<SettingOutlined />} key="filters" header="Filters">
        <Form.Item label="Method" name="method">
          <Select allowClear>
            {HTTP_METHODS.map((method) => (
              <Option key={method} value={method}>
                {method}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Status" name="status">
          <AutoComplete
            options={statusSelectOpts}
            filterOption={(input, opt) => opt.value.startsWith(input)}
          />
        </Form.Item>
        <Form.Item label="Sort by" name="sort">
          <Select allowClear>
            <Option key="date" value="date">
              Date
            </Option>
            <Option key="url" value="url">
              URL
            </Option>
            <Option key="wait" value="wait">
              Response time
            </Option>
            <Option key="status" value="status">
              Status
            </Option>
          </Select>
        </Form.Item>
        <Form.Item label="Sort dir" name="sortDir">
          <Radio.Group>
            <Radio value="asc">ASC</Radio>
            <Radio value="desc">DESC</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Date" name="dateRange" rules={[{ type: "array" }]}>
          <RangePicker showTime />
        </Form.Item>
      </Panel>
    </Collapse>
  );
};
export default HistorySearchFilters;
