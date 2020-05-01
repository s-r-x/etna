import urlParser from "urijs";
import qs from "query-string";
import splitOnFirst from "split-on-first";

// https://github.com/sindresorhus/query-string/blob/master/index.js#L197
const extractSearch = (url: string) => {
  const hashStart = url.indexOf("#");
  if (hashStart !== -1) {
    url = url.slice(0, hashStart);
  }
  const queryStart = url.indexOf("?");
  if (queryStart === -1) {
    return undefined;
  }

  return url.slice(queryStart + 1);
};
const parseQuery = (raw: string) => {
  return qs.parse(raw, {
    sort: false,
  });
};
// https://github.com/sindresorhus/query-string/blob/master/index.js#L217
const parseSearchAsArray = (
  input: string
): { key: string; value: string }[] => {
  const acc = [] as { key: string; value: string }[];
  input = input.trim().replace(/^[?#&]/, "");
  if (!input) {
    return [
      {
        key: "",
        value: "",
      },
    ];
  }
  for (const param of input.split("&")) {
    const [key, value] = splitOnFirst(param, "=");
    const normalizedKey = key ? key : value ? "" : param;
    acc.push({
      key: normalizedKey,
      value: value ? value : normalizedKey ? "" : param,
    });
  }
  return acc;
};
const parseUrl = (url: string) => urlParser(url);
export const URLUtils = {
  extractSearch,
  parseQuery,
  parseSearchAsArray,
  parseUrl,
};
