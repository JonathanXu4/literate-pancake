const express = require("express");
const api = express();
const { StarRail } = require("starrail.js");

const client = new StarRail({ cacheDirectory: "./cache" });
client.cachedAssetsManager.cacheDirectorySetup();

// Example endpoint
api.get("/greetings", (req, res) => {
  //const client = new StarRail();

  const characters = client.getAllCharacters();
  // print character names in language "en"
  //console.log();
  res.json({ message: characters.map((c) => c.name.get("en")) });
});

module.exports = api;
