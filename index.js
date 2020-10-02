const fs = require("fs");
const csv = require("csvtojson/v2");
const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const port = process.env.Port
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchWin = require("./ipl/matchWin");
const Extrarun = require("./ipl/Extrarun.js");
const bowlerEco = require("./ipl/bowlerEco.js");
const WinVenue = require("./ipl/WinVenue");
const top_ten_economy = require("./ipl/top_ten_economy");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv"
const JSON_OUTPUT_FILE_PATH = "./public/data.json";
console.log("hellow world")
function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      // let result = matchesPlayedPerYear(matches);
      // saveMatchesPlayedPerYear(result);
      csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then(deliveries => {
          let result = {}

          result.matchesPlayedPerYear = matchesPlayedPerYear(matches)
          result.matchWin = matchWin(matches)
          result.Extrarun = Extrarun(matches, deliveries)
          result.bowlerEco = bowlerEco(matches, deliveries)
          result.WinVenue = WinVenue(matches)
          saveMatchesWin(result)
        });

    })
}
function saveMatchesWin(result) {

  const jsonData = result
  console.log("to good")
  console.log(jsonData)
  const jsonString = JSON.stringify(jsonData)
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

main();

app.use(express.static('public'))
app.use(bodyParser.json())
app.get('/economy', (req, res) => {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then(deliveries => {

          let year = req.query.year
          let top_ten_econom = top_ten_economy(matches, deliveries, year)
          res.json({ year, top_ten_econom })

        })
   });

})

app.listen(port || 8080);