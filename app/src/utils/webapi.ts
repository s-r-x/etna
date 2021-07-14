import FileSaver from "file-saver";

type TCreateFormDataDto = {
  key: string;
  value: string | File;
  fileName?: string;
};

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
  createFormData(data: TCreateFormDataDto[]) {
    const body = new FormData();
    data.forEach(({ key, value, fileName }) => {
      if (value instanceof File) {
        body.append(key, value, fileName);
      } else {
        body.set(key, value);
      }
    });
    return body;
  },
  fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.toString());
      reader.onerror = (error) => reject(error);
    });
  },
};
