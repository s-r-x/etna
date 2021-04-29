import React, { useCallback } from "react";
import { UploadOutlined } from "@ant-design/icons";
import * as S from "./styled";

type TProps = {
  addFiles(files: File[]): void;
};
const FileUploadForm = (props: TProps) => {
  const addFiles = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(target.files);
      props.addFiles(files);
    },
    [props.addFiles]
  );
  return (
    <S.Container>
      <S.UploadInput
        multiple
        onChange={addFiles}
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
    </S.Container>
  );
};
export default FileUploadForm;
