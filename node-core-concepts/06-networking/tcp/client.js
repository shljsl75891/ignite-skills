const net = require("node:net");

const socket = net.createConnection({ host: "127.0.0.1", port: 8080 }, () => {
  console.log("connected to TCP server!");
  const buff = Buffer.alloc(2);
  buff[0] = 12;
  buff[1] = 34;
  socket.write(buff);
  socket.write("Hello server !!!");
});
