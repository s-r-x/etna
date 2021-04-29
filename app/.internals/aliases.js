const { SRC } = require("./constants");
const path = require("path");

const domains = path.join(SRC, "domains");
module.exports = {
  "@phoenix": path.join(domains, "ws", "phoenix"),
  "@socket-io": path.join(domains, "ws", "socket-io"),
  "@ws": path.join(domains, "ws"),
  "@": SRC,
};
