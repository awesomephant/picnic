const fs = require('fs')
const fetch = require('node-fetch');
const parse = require('csv-parse')
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1jPOtPG21i16eRGOMBtDYJgFq1WlweNExCQ34Ui1bUtZ1aFad_yjA41sjc5-vjONVblFuJFWusWmW/pub?gid=0&single=true&output=csv"

console.log("Fetching calendar data...")

fetch(sheetURL)
    .then(res => res.text())
    .then(body => {
        parse(body, { columns: true }, function (err, data) {
            console.log(`${data.length} calendar entries found.`)
            fs.writeFileSync('./src/calendarData.json', JSON.stringify({ data: data }))
            console.log(`Calendar data written to calendarData.json`)
        })
    });