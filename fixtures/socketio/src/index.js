const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "http://0.0.0.0:8080",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("greetings", "hi");
  socket.onAny((ev, ...args) => {
    socket.emit(ev, args);
  });
  socket.on("message", function (message) {
    socket.emit("message", message);
  });
});

server.listen(1235, () => {
  console.log("listening on *:1235");
});
