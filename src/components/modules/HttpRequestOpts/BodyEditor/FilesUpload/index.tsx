import React from "react";
import cls from "./index.less";
import { Empty, Collapse } from "antd";
import { useFileStore } from "@/hooks/filesListStore";
import List from "./List";
import Controls from "./Controls";
import _ from "lodash";
const { Panel } = Collapse;

const FilesUpload = () => {
  const [files, store] = useFileStore();
  return (
    <div className={cls.wrap}>
      <Collapse>
        <Panel key="file" header="Files">
          <div className={cls.container}>
            <Controls addFiles={store.addFiles} />
            {_.isEmpty(files) ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No files"
              />
            ) : (
              <List items={files} onRemove={store.removeFile} />
            )}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default FilesUpload;
