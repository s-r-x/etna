import React from "react";
import { Empty, Collapse } from "antd";
import { useFileStore } from "@/hooks/filesListStore";
import List from "./List";
import Controls from "./Form";
import _ from "lodash";
import * as S from "./styled";
const { Panel } = Collapse;

const FilesUpload = () => {
  const [files, store] = useFileStore();
  return (
    <S.Container>
      <Collapse>
        <Panel key="file" header="Files">
          <S.InnerContainer>
            <Controls addFiles={store.addFiles} />
            {_.isEmpty(files) ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No files"
              />
            ) : (
              <List items={files} onRemove={store.removeFile} />
            )}
          </S.InnerContainer>
        </Panel>
      </Collapse>
    </S.Container>
  );
};

export default FilesUpload;
