
const {getAllClients} = require("./clients.js");

function broadcast(message, sender) {
    for(let [name, client] of getAllClients()) {
        if(client !== sender) {
            client.write(message + "\n");
        }
    }
}

module.exports = broadcast;