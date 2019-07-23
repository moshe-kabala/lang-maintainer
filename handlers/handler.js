const jsHandler = require("./js-handler");
const fs = require("fs");

const JSHandler = "js";
// const configurationHandler = "groupfiles"
// const JSHandler = extractAndParseJsonText;

const fileHandlerMap = {
  [JSHandler]: jsHandler
};

class Handler {
  constructor(checkFiles) {
    this.checkFiles = checkFiles;
  }

  get(fileName) {
    for (const { test, handler } of this.checkFiles) {
      if (test.test(fileName)) {
        return fileHandlerMap[handler];
      }
    }
  }

  run({ fileName, path = "", origin = "" }, store) {
    const handler = this.get(fileName);
    if (!handler) return;
    if (origin && origin[origin.length -1] != "/") {
      origin+="/"
    }
    console.log(`Parse ${origin + path + fileName}`)
    const fileText = fs.readFileSync(origin + path + fileName).toString();
    handler({ fileName, fileText, path }, store);
  }
}

module.exports = Handler;
