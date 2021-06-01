import http, { IncomingHttpHeaders } from "http";
import axios, { Method } from "axios";
import FileType from "file-type";

const etnaHeaderRegex = /^x-etna-header-/;

const normalizeHeaders = (headers: IncomingHttpHeaders) => {
  return Object.entries(headers).reduce((acc, [k, v]) => {
    const stripped = k.replace(etnaHeaderRegex, "");
    if (stripped !== k) {
      acc[stripped] = v;
    }
    return acc;
  }, {} as IncomingHttpHeaders);
};
const extractTarget = (headers: IncomingHttpHeaders) => {
  return headers["x-etna-target"] as string;
};
const extractMethod = (headers: IncomingHttpHeaders) => {
  const method = (headers["x-etna-method"] || "GET") as Method;
  return method;
};
const normalizeResData = async (
  data: ArrayBuffer
): Promise<{
  isBinary: boolean;
  data: string;
}> => {
  const type = await FileType.fromBuffer(data);
  const isBinary = Boolean(type);
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
  res.setHeader("content-type", "application/json; charset=utf-8");
  const method = extractMethod(req.headers);
  const target = extractTarget(req.headers);
  const proxyHeaders = normalizeHeaders(req.headers);
  try {
    const perfStart = Date.now();
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
    const response = {
      bin: isBinary,
      data,
      headers,
      status,
      method,
      url: target,
      time: Date.now() - perfStart,
      size: rawData.byteLength,
    };
    res.end(JSON.stringify(response));
  } catch (e) {
    // TODO:: eror
    res.statusCode = 400;
    console.error(e);
    res.end("error here");
  }
});
server.listen(3000, () => {
  console.log("started");
});

process.on("SIGTERM", () => server.close());
