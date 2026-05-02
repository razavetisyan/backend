
const {getAllClients} = require("./clients.js");

function listUsers(socket) {
    const users = Array.from(getAllClients().keys()).join(", ");
    
    socket.write(`All users: ${users}\n`);
}

module.exports = listUsers;