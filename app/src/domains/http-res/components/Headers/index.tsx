import React from "react";
import { Table, Empty } from "antd";
import { TConnectorProps } from "../../connectors";
import _ from "lodash";
const { Column } = Table;

type TProps = Pick<TConnectorProps, "headers">;
const ResponseHeaders = (props: TProps) => {
  if (_.isEmpty(props.headers)) {
    return <Empty />;
  }
  return (
    <Table tableLayout="fixed" bordered pagination={false} dataSource={props.headers}>
      <Column width="50%" title="Key" dataIndex="key" key="key" />
      <Column width="50%" title="Value" dataIndex="value" key="value" />
    </Table>
  );
};

export default ResponseHeaders;
