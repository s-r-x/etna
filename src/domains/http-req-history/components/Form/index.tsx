import React, { useCallback } from "react";
import { Input } from "antd";
import { TConnectorProps } from "../../connectors";
import { Form, Button, Popover } from "antd";
import _ from "lodash";
import Filters from "./Filters";
import { Container } from "./styled";
import { SettingOutlined } from "@ant-design/icons";
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
        layout="vertical"
        onValuesChange={onChange}
        initialValues={props.searchForm}
      >
        <Container>
          <Form.Item name="url">
            <Search placeholder="URL" allowClear />
          </Form.Item>
          <Popover trigger={["click"]} content={<Filters />}>
            <Button title="Filters" icon={<SettingOutlined />} />
          </Popover>
        </Container>
      </Form>
    </>
  );
};
export default HistorySearchForm;
