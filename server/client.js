
const net = require("net");

const client = net.createConnection({port : 3001, host : "localhost"}, () => {
    console.log("client connected");
});

process.stdin.on("data", (data) => {
    client.write(data.toString());
})

client.on("data", (data) => {
    console.log(data.toString());
});

client.on("end", () => {
    console.log("client disconnected");
});



