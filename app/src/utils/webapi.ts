import { TFileObject } from "@/typings/file";
import FileSaver from "file-saver";
export const WebApi = {
  downloadFile(content: string | Blob, name: string): void {
    FileSaver.saveAs(content, name);
  },
  copyToClipboard(text: string): void {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  },
  createFormData(dict: TStringDict, files?: TFileObject[]) {
    const body = new FormData();
    if (files) {
      for (const file of files) {
        body.append(file.file.name, file.file);
      }
    }
    for (const key in dict) {
      body.set(key, dict[key]);
    }
    return body;
  },
};
