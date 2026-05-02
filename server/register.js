
const broadcast = require("./broadcast.js");
const {addClient, hasClient} = require("./clients.js");

function register(socket, name) {
    if(hasClient(name)) {
        socket.write("Username taken\n");
    }

    socket.name = name;
    addClient(name, socket);

    // socket.write(`${name} joined chat\n`);

    broadcast(`${name} joined chat`, socket);
}

module.exports = register;