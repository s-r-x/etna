import { THTTPMethod, THTTPBodyMIME } from "@/typings/http";

export const HTTP_METHODS: THTTPMethod[] = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
];
export const HTTP_MIME_TYPES: THTTPBodyMIME[] = [
  "application/json",
  "application/x-www-form-urlencoded",
  "application/xml",
  "binary",
  "multipart/form-data",
  "text/html",
  "text/plain",
];
