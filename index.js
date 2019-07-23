#!/usr/bin/node
const fs = require("fs");

const Handler = require("./handlers/handler");
const Store = require("./store/store");
const scanFiles = require("./utils/scan-files");
const getRootConfiguration = require("./utils/get-root-configuration");

function createDataFile(store) {
  fs.writeFileSync("data.json", JSON.stringify(store.texts, null, 2));
}

function createMetaData(store) {
  fs.writeFileSync("meta-data.json", JSON.stringify(store.toJson(), null, 2));
}

// // todo
// function createGroups({ data, index, groups }) {}

// // todo
// const langConfJson = /langconf.json$/;
// const langTextJson = /langtexts.json$/;

const configuration = getRootConfiguration();

const store = new Store();
const handler = new Handler(configuration.checkFiles);

const files = scanFiles(__dirname, configuration.ignore);

files.forEach(data => {
  handler.run(data, store);
});

createDataFile(store);
createMetaData(store);
