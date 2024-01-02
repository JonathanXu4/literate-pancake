var http = require("http");
const { StarRail } = require("starrail.js");
const client = new StarRail();

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Hello World!");
  })
  .listen(8080);

const characters = client.getAllCharacters();
// print character names in language "en"
console.log(characters.map((c) => c.name.get("en")));
