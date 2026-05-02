
const {removeClient} = require("./clients.js");

function disconnect(socket) {
    if(socket.name) {
        removeClient(socket);
    }
}

module.exports = disconnect;