import React, { useCallback } from "react";
import { Input } from "antd";
import { TConnectorProps } from "../../connectors";
import { Button, Popover } from "antd";
import _ from "lodash";
import Filters from "./Filters";
import { Form, Container } from "./styled";
import { SettingOutlined } from "@ant-design/icons";
const { Search } = Input;

type TProps = Pick<TConnectorProps, "searchForm" | "updateSearchForm">;
const HistorySearchForm = (props: TProps) => {
  const onChange = useCallback(
    _.debounce((changed: TAnyDict) => {
      props.updateSearchForm(changed);
    }, 150),
    [props.searchForm]
  );
  return (
    <Container>
      <Form onValuesChange={onChange} initialValues={props.searchForm}>
        <Form.Item name="url">
          <Search placeholder="URL" allowClear />
        </Form.Item>
      </Form>
      <Popover
        trigger={["click"]}
        content={<Filters onChange={onChange} searchForm={props.searchForm} />}
      >
        <Button title="Filters" icon={<SettingOutlined />} />
      </Popover>
    </Container>
  );
};
export default HistorySearchForm;
