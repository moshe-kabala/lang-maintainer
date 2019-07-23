
// parse
const objectPattern = /=.*?\{.*\}/s;
function parseContent({ content, fileName, section }) {
  // content.substr(/(const|var|let)=.*?\{.*?field2/)

  const result = content.match(objectPattern);
  if (result != null) {
    try {
      const o = eval("let w " + result + "; w");
      return Object.values(o);
    } catch (err) {
      console.error(
        "Failed to parse translate object \n",
        `file name`,
        fileName,
        "\n",
        `file content \n`,
        content,
        `\n`,
        `error \n`,
        err
      );
    }
  }
}

// check and get contents
const contentPattern = /\@Translation.*?\@End_of_translation/gs;
function extractAndParseJSFile({ fileName, fileText, path = "" }, store) {
  const contentsFile = fileText.match(contentPattern);
  if (contentsFile != null) {
    let i = 0;
    while (contentsFile[i]) {
      const section = i + 1;
      const texts = parseContent({
        content: contentsFile[i],
        fileName,
        section
      });
      if (texts) {
        store.insertTexts({ texts, fileName, section, path });
      }
      i++;
    }
  }
}


module.exports = extractAndParseJSFile