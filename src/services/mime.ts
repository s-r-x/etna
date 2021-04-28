import { THTTPBodyMIME } from "@/typings/http";

const humanReadableMimes: { [key in THTTPBodyMIME]: string } = {
  "application/json": "JSON",
  "application/xml": "XML",
  "text/html": "HTML",
  "text/plain": "Plain text",
  "application/x-www-form-urlencoded": "Form urlencoded",
  "multipart/form-data": "Multipart form-data",
  "application/graphql": "Graphql",
};
export const MimeService = {
  formatHR(mime: THTTPBodyMIME) {
    if (mime in humanReadableMimes) {
      return humanReadableMimes[mime];
    } else {
      return mime;
    }
  },
};
