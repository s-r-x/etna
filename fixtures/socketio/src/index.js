const http = require("http");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 1235;
const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("conn", "hi");
  socket.onAny((ev, ...args) => {
    socket.emit(ev, args);
  });
  socket.on("message", function (message) {
    socket.emit("message", message);
  });
});

server.listen(PORT, () => {
  console.log(`socketio fixture started. port: ${PORT}`);
});
