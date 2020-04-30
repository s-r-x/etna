export const WebApi = {
  downloadFile(content: string, name: string, type?: string): void {
    var a = document.createElement("a");
    const file = new Blob([content], { type: type || "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = name;
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
