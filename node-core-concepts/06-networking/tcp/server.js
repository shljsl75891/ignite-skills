const net = require("node:net");

/**
 * Creates a TCP server that listens for incoming connections.
 * @param {net.Socket} socket The socket representing the connection to the client.
 */
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    console.log(data);
  });
});

const PORT = 8080;

server.listen(PORT, "127.0.0.1", () => {
  console.info("opened server on: ", server.address());
});
