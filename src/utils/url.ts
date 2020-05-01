//import urlParser from "url-parse";
import qs from "query-string";
import splitOnFirst from "split-on-first";

const extractSearch = (url: string) => {
  return qs.extract(url);
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
    return [];
  }
  for (const param of input.split("&")) {
    let [key, value] = splitOnFirst(param, "=");
    acc.push({
      key,
      value,
    });
  }
  return acc;
};
export const URLUtils = {
  extractSearch,
  parseQuery,
  parseSearchAsArray,
};
