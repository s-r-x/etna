import React, { useCallback } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { provide, TProviderProps } from "./provider";
import cls from "./index.less";
import { useFileStore } from "@/hooks/filesListStore";
import List from "./List";
import _ from "lodash";

const FilesUpload = (props: TProviderProps) => {
  const [files, store] = useFileStore();
  const addFiles = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(target.files);
      store.addFiles(files);
    },
    [store.addFiles]
  );
  return (
    <div className={cls.container}>
      <input
        multiple
        onChange={addFiles}
        className={cls.fileUpload}
        id="file-upload"
        type="file"
      />
      <label
        aria-label="upload files"
        className="ant-btn"
        htmlFor="file-upload"
      >
        <UploadOutlined /> Upload file(s)
      </label>
      {!_.isEmpty(files) && <List items={files} onRemove={store.removeFile} />}
    </div>
  );
};

export default provide(FilesUpload);
