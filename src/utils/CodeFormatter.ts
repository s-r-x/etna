import { html } from "js-beautify";
// TODO:: lazyload

const formatJson = (data: string): string => {
  try {
    return JSON.stringify(JSON.parse(data), null, 2);
  } catch (_e) {
    return data;
  }
};
export const CodeFormatter = {
  format(code: string, mime: string): string {
    switch (mime) {
      case "application/xml":
      case "text/html":
        return html(code, { indent_size: 2 });
      case "application/json":
        return formatJson(code);
      default:
        return code;
    }
  },
};
