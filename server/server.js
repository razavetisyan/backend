const net = require("net");

const PORT = 3001;

let clients = [];

const server = net.createServer((socket) => {
  console.log("someone connected");
  if (clients.length > 5) {
    throw new Error("too many clients");
  }

  clients.push(socket);
  socket.on("data", (data) => {
    const msg = data.toString();

    for (let client of clients) {
      if (client !== socket) {
        client.write(msg);
      }
    }
  });

  socket.on("end", () => {
    console.log("client disconnected");
    const index = clients.indexOf(socket);

    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

server.on("close", () => {
  console.log("server closed");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("server running");
});
