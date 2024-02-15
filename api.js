const express = require("express");
const api = express();
const { StarRail, CharacterStats } = require("starrail.js");

const client = new StarRail({ cacheDirectory: "./cache" });
client.cachedAssetsManager.cacheDirectorySetup();
const characters = client.getAllCharacters().sort(function (a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
});

// Example endpoint
api.get("/greetings", (req, res) => {
  //const client = new StarRail();

  // print character names in language "en"
  //console.log();
  res.json({ message: characters.map((c) => c.name.get("en")) });
});

api.get("/stats", (req, res) => {
  var charList = [];
  const levels = [1, 20, 20, 30, 30, 40, 40, 50, 50, 60, 60, 70, 70, 80];
  const levelText = [
    "1/20",
    "20/20",
    "20/30",
    "30/30",
    "30/40",
    "40/40",
    "40/50",
    "50/50",
    "50/60",
    "60/60",
    "60/70",
    "70/70",
    "70/80",
    "80/80",
  ];

  let text = "";

  let i = 0;

  for (const character of characters) {
    const name = character.name.get();

    text += name + "\n";
    let lv = 0;
    var charName = '"' + name + '":';
    var ascList = {};
    for (let asc = 0; asc < 7; asc++) {
      for (let j = 0; j < 2; j++) {
        const stat = character.getStatsByLevel(asc, levels[lv]);
        //text += stat;
        const atk = stat.at(0).valueText;
        const def = stat.at(1).valueText;
        const hp = stat.at(2).valueText;
        const spd = stat.at(3).valueText;
        text += levelText[lv] + " " + hp + " " + atk + " " + def + " " + spd;
        //charList.name[hp] = hp;
        //console.log(" ", levelText[lv], " ", hp, " ", atk, " ", def, " ", spd);
        ascList[levelText[lv]] = { hp, atk, def, spd };
        lv++;
        //console.log(`"${name}" - ${combatType} - ${stat}`);
      }
    }
    charName += ascList;
    //console.log(ascList);
    charList[i] = charName;
    charList.sort((a, b) => a.localeCompare(b));
    i++;
  }
  //console.log(charList);

  res.json({ charList });
  //console.log(text);
});

module.exports = api;
