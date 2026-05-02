
const {getClient} = require("./clients.js");

function privateMessage(socket, msg) {
    const data = msg.split(" ");

    if(data.length < 3) {
        socket.write("Usage: /dm username message\n");
        return;
    }

    const user = data[1];
    const message = data[2];

    const target = getClient(user);

    if(!target) {
        socket.write("user not found\n");
        return;
    }

    target.write(`message from ${socket.name}: ${message}\n`);
}

module.exports = privateMessage;