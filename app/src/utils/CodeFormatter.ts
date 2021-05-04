import prettier from "prettier/standalone";
import gqlParser from "prettier/parser-graphql";
import htmlParser from "prettier/parser-html";
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
        return prettier.format(code, {
          parser: "html",
          plugins: [htmlParser],
        });
      case "application/json":
        return formatJson(code);
      case "graphql":
      case "application/graphql":
        return prettier.format(code, {
          parser: "graphql",
          plugins: [gqlParser],
        });
      default:
        return code;
    }
  },
  formatHeaders(headers: { key: string; value: string }[]) {
    return headers.map(({ key, value }) => `${key}: ${value}`).join("\n");
  },
};
