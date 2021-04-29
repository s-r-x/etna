import React from "react";
import { TFileObject } from "@/typings/file";
import { List, Button } from "antd";
import { DeleteOutlined, FileOutlined } from "@ant-design/icons";
import pb from "pretty-bytes";

type TProps = {
  items: TFileObject[];
  onRemove(id: string): void;
};
const FileUploadList = (props: TProps) => {
  return (
    <List
      itemLayout="horizontal"
      size="small"
      locale={{ emptyText: <span /> }}
      split
      dataSource={props.items}
      rowKey="id"
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              key={item.id}
              type="primary"
              danger
              onClick={() => props.onRemove(item.id)}
              size="small"
              title="Remove file"
              shape="circle"
              icon={<DeleteOutlined />}
            />,
          ]}
        >
          <List.Item.Meta
            description={pb(item.file.size)}
            avatar={<FileOutlined />}
            title={item.file.name}
          />
        </List.Item>
      )}
    />
  );
};

export default FileUploadList;
