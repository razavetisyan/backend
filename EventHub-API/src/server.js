const app = require("./app.js");
const ENV = require("./config/env.js");

const connectDB = require("./config/db.js");

async function startServer() {
    await connectDB(ENV.MONGO_URI);

    app.listen(ENV.PORT, () => {
    console.log(`Server running on http://localhost:${ENV.PORT}`);
  });
}

startServer();