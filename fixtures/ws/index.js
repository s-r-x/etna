import {WebSocketServer} from "ws";

const PORT = process.env.PORT || 9000;
const server = new WebSocketServer({ port: PORT });
server.on("connection", (client) => {
  console.log("new conn");
  client.on("message", (msg) => {
    msg = msg.toString();
    console.log("new msg:", msg);
    client.send(msg);
  });
  client.on("close", () => console.log("conn closed"));
});
