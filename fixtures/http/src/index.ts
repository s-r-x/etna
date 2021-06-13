import Express from "express";
import path from "path";
import fs from "fs";
import basicAuth from "express-basic-auth";

const ROOT = path.resolve(__dirname, "..");
const BIN_ROOT = path.join(ROOT, "bin");
const PORT = 4567;

const app = Express();
app.get("/text", (_req, res) => {
  res.type(".txt");
  res.send("hi");
});
app.get("/json", (_req, res) => {
  res.send({
    meaningOfLife: 42,
    isTrue: false,
    src: "book",
    edges: [1, true, {}, "hi", []],
  });
});
app.get("/xml", (_req, res) => {
  res.type(".xml");
  res.send(`
    <?xml version="1.0"?>
    <greeting>Hello, world!</greeting> 
  `);
});
app.get("/html", (_req, res) => {
  res.type(".html");
  res.send(`
    <!DOCTYPE html> 
    <html>
    <body>
      <h1>hi</h1>
    </body>
    </html>
  `);
});

app.get("/png", (_req, res) => {
  res.type(".png");
  fs.createReadStream(path.join(BIN_ROOT, "pic.png")).pipe(res);
});
app.get("/jpg", (_req, res) => {
  res.type(".jpg");
  fs.createReadStream(path.join(BIN_ROOT, "pic.jpg")).pipe(res);
});
app.get("/svg", (_req, res) => {
  res.type(".svg");
  fs.createReadStream(path.join(BIN_ROOT, "pic.svg")).pipe(res);
});
app.get("/gif", (_req, res) => {
  res.type(".gif");
  fs.createReadStream(path.join(BIN_ROOT, "pic.gif")).pipe(res);
});
app.get("/bmp", (_req, res) => {
  res.type(".bmp");
  fs.createReadStream(path.join(BIN_ROOT, "pic.bmp")).pipe(res);
});
app.get("/webp", (_req, res) => {
  res.type(".webp");
  fs.createReadStream(path.join(BIN_ROOT, "pic.webp")).pipe(res);
});
app.get("/xIcon", (_req, res) => {
  res.type("image/x-icon");
  fs.createReadStream(path.join(BIN_ROOT, "pic.png")).pipe(res);
});
app.get("/pdf", (_req, res) => {
  res.type(".pdf");
  fs.createReadStream(path.join(BIN_ROOT, "file.pdf")).pipe(res);
});

app.use(
  "/basicAuth",
  basicAuth({
    users: {
      admin: "admin",
    },
  }),
  (_req, res) => {
    res.send("authorized");
  }
);

const server = app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

process.on("SIGTERM", () => server.close());
