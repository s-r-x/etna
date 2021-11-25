import http, { IncomingHttpHeaders } from "http";
import axios, { Method } from "axios";
import FileType from "file-type";
import { IProxyRes } from "./typings";

type TStringDict = Record<string, string>;

function last<T>(array: T[]): T {
  return array[array.length - 1];
}
const etnaHeaderRegex = /^x-etna-header-/;
const IMMUTABLE_HEADERS = new Set(["authorization", "content-type"]);
const TARGET_HEADER_NAME = "x-etna-target";
const normalizeHeaders = (headers: IncomingHttpHeaders): TStringDict => {
  return Object.entries(headers).reduce((acc, [k, v]) => {
    if (Array.isArray(v)) {
      v = last(v);
    }
    if (IMMUTABLE_HEADERS.has(k)) {
      acc[k] = v;
      return acc;
    }
    const stripped = k.replace(etnaHeaderRegex, "");
    if (stripped !== k) {
      acc[stripped] = v;
    }
    return acc;
  }, {} as TStringDict);
};
const extractTarget = (headers: IncomingHttpHeaders): string => {
  const header = headers[TARGET_HEADER_NAME];
  return Array.isArray(header) ? last(header) : header;
};
const extractMethod = (headers: IncomingHttpHeaders): Method => {
  const header = headers["x-etna-method"];
  return ((Array.isArray(header) ? last(header) : header) || "GET") as Method;
};

const checkIfBinary = async (data: ArrayBuffer) => {
  const type = await FileType.fromBuffer(data);
  if (!type) {
    return false;
  }
  return type.mime !== "application/xml";
};
const normalizeResData = async (
  data: ArrayBuffer
): Promise<{
  isBinary: boolean;
  data: string;
}> => {
  const isBinary = await checkIfBinary(data);
  return {
    isBinary,
    // @ts-ignore
    data: isBinary ? data.toString("base64") : data.toString(),
  };
};
const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Expose-Headers", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.end("ok");
    return;
  }
  const target = extractTarget(req.headers);
  if (!target) {
    res.statusCode = 400;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end(`${TARGET_HEADER_NAME} header is required`);
    return;
  }
  res.setHeader("content-type", "application/json; charset=utf-8");
  const method = extractMethod(req.headers);
  const proxyHeaders = normalizeHeaders(req.headers);
  const proxyRes: Partial<IProxyRes> = {
    url: target,
    method,
  };
  const perfStart = Date.now();
  try {
    const {
      data: rawData,
      headers,
      status,
    } = await axios({
      url: target,
      method,
      data: req,
      headers: proxyHeaders,
      responseType: "arraybuffer",
    });
    const { isBinary, data } = await normalizeResData(rawData);
    proxyRes.bin = isBinary;
    proxyRes.data = data;
    proxyRes.error = false;
    proxyRes.status = status;
    proxyRes.headers = headers;
    proxyRes.size = rawData.byteLength;
  } catch (e) {
    const axiosRes = e?.response;
    proxyRes.status = axiosRes?.status;
    proxyRes.headers = axiosRes?.headers;
    proxyRes.error = true;
    if (axiosRes?.data) {
      const { isBinary, data } = await normalizeResData(axiosRes.data);
      proxyRes.data = data;
      proxyRes.bin = isBinary;
      proxyRes.size = axiosRes.data.byteLength;
    } else {
      proxyRes.bin = false;
      const msg = e?.message;
      proxyRes.data = msg;
      proxyRes.size = msg?.length ?? 0;
    }
  } finally {
    proxyRes.time = Date.now() - perfStart;
    res.end(JSON.stringify(proxyRes));
  }
});
server.listen(3000, () => {
  console.log("started");
});

process.on("SIGTERM", () => server.close());
