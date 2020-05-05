import React from "react";
import { TProviderProps } from "../provider";
import { Table, Empty } from "antd";
import _ from "lodash";
const { Column } = Table;

type TProps = Pick<TProviderProps, "headers">;
const ResponseHeaders = (props: TProps) => {
  if (_.isEmpty(props.headers)) {
    return <Empty />;
  }
  return (
    <Table bordered pagination={false} dataSource={props.headers}>
      <Column width="50%" title="Key" dataIndex="key" key="key" />
      <Column width="50%" title="Value" dataIndex="value" key="value" />
    </Table>
  );
};

export default ResponseHeaders;
