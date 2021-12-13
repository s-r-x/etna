import { THTTPBodyMIME } from "../typings";

const humanReadableMimes: { [key in THTTPBodyMIME]: string } = {
  "application/json": "JSON",
  "application/xml": "XML",
  "text/html": "HTML",
  "text/plain": "Plain text",
  "application/x-www-form-urlencoded": "Form urlencoded",
  "multipart/form-data": "Multipart form-data",
  "application/graphql": "Graphql",
};

export const humanReadableMime = (mime: THTTPBodyMIME) => {
  if (mime in humanReadableMimes) {
    return humanReadableMimes[mime];
  } else {
    return mime;
  }
};
