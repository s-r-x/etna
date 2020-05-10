type TDownloadOpts = {
  shouldCreateBlob?: boolean;
};
export const WebApi = {
  downloadFile(content: string, name: string, opts: TDownloadOpts = {}): void {
    const a = document.createElement("a");
    a.download = name;
    if (opts.shouldCreateBlob) {
      const file = new Blob([content], { type: "text/plain" });
      a.href = URL.createObjectURL(file);
    } else {
      a.href = "data:text/plain;charset=utf-8," + content;
    }
    a.click();
  },
  copyToClipboard(text: string): void {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  },
};
