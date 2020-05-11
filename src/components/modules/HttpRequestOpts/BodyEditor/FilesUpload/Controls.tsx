import React, { useCallback } from "react";
import cls from "./index.less";
import { UploadOutlined } from "@ant-design/icons";

type TProps = {
  addFiles(files: File[]): void;
};
const FileUploadControls = (props: TProps) => {
  const addFiles = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(target.files);
      props.addFiles(files);
    },
    [props.addFiles]
  );
  return (
    <div className={cls.controls}>
      <input
        multiple
        onChange={addFiles}
        className={cls.fileUpload}
        id="file-upload"
        type="file"
      />
      <label
        aria-label="upload files"
        className="ant-btn ant ant-btn-primary"
        htmlFor="file-upload"
      >
        <UploadOutlined /> Upload file(s)
      </label>
    </div>
  );
};
export default FileUploadControls;
