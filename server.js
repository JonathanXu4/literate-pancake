const express = require("express");
const cors = require("cors");
const path = require("path");

// updater
/*const { StarRail } = require("starrail.js");
const client = new StarRail({ showFetchCacheLog: true });
client.cachedAssetsManager.fetchAllContents();*/

const app = express();
app.use(cors());

const server = require("http").createServer(app);
const port = 8000;

// Middleware
app.use(express.json());
app.use(express.static("express"));

// API
const api = require("./api"); // Assuming your API file is in the same directory
app.use("/api", api);

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "express", "index.html"));
});

// Server
server.listen(port, () => {
  console.debug(`Server listening on port ${port}`);
});
