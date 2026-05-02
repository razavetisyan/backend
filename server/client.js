
const net = require("node:net");
const { homedir } = require("node:os");

const PORT = 3001;
const HOST = "localhost";

const client = net.createConnection({port: PORT, host: HOST}, () => {
    console.log("client connected to server");
})

client.on("data", (data) => {
    process.stdout.write(data.toString());
});

client.on("end", () => {
    console.log("disconnected from server");
    process.exit();
});

client.on("error", (err) => {
    console.log(`Error: ${err.message}`);
});

process.stdin.on("data", (data) => {
    const msg = data.toString().trim();

    if(msg === "/exit") {
        client.end();
        process.exit();
    }

    client.write(msg);
});