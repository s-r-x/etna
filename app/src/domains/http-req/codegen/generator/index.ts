import HTTPSnippet from "httpsnippet";

export const HttpCodegen = {
  generate(data: HTTPSnippet.Data, target: string, client: string): string {
    try {
      const snippet = new HTTPSnippet(data);
      return snippet.convert(target, client) || "";
    } catch (e) {
      console.error(e);
      return "";
    }
  },
};
