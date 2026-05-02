const clients = new Map();

function addClient(name, socket) {
  clients.set(name, socket);
}

function removeClient(name) {
  clients.delete(name);
}

function getClient(name) {
  return clients.get(name);
}

function hasClient(name) {
  return clients.has(name);
}

function getAllClients(){ 
    return clients;
}

module.exports = {
    addClient,
    removeClient,
    getClient,
    hasClient,
    getAllClients
} 