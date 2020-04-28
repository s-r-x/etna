import store, { FilesListStore } from "@/store/_files";
import { useState, useEffect } from "react";
import { TFileObject } from "@/typings/file";

type ReturnValue = [TFileObject[], FilesListStore];
export const useFileStore = (): ReturnValue => {
  const [files, setFiles] = useState(store.getFiles());
  const sub = (files: TFileObject[]) => {
    setFiles(files);
  };
  useEffect(() => {
    store.subscribe(sub);
    return () => store.unsubscribe(sub);
  }, []);
  return [files, store];
};
