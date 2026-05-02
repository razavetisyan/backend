
const net = require("node:net");

const register = require("./register.js");
const broadcast = require("./broadcast.js");
const privateMessage = require("./privateMessage.js");
const disconnect = require("./disconnect.js");
const listUsers = require("./listUsers.js");

const PORT = 3001;
const HOST = "localhost";

const server = net.createServer((socket) => {
    socket.write("Enter username: \n");

    socket.on("data", (data) => {
        const msg = data.toString().trim();

        if(!socket.name) {
            const user = register(socket, msg);
            if(user) {
                broadcast(socket.name, msg);
            }
            return;
        }

        if(msg === "/list") {
            listUsers(socket);
            return;
        }

        if(msg.startsWith("/dm")) {
            privateMessage(socket, msg);
            return;
        }

        broadcast(`${socket.name}: ${msg}`, socket);
    });

    socket.on("end", () => {
        disconnect(socket);

        broadcast(`${socket.name} left`, socket);
    });
});

server.listen(PORT, HOST, () => {
    console.log("server running");
})