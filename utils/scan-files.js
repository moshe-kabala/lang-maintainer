const fs = require("fs");
const path = require("path");

/** Retrieve file paths from a given folder and its subfolders. */
const scanFiles = (_folderPath, ignoreFiles = []) => {
  const result = _getFilePaths(_folderPath);
  return normalizePaths(result);

  function normalizePaths(paths) {
    return paths.map(_path => {
      const lastSlash = _path.lastIndexOf("/");
      const fileName = _path.substring(lastSlash + 1);
      let path = _path.substring(_folderPath.length, lastSlash + 1);
      if (path[0] == "/") {
        path = path.substring(1);
      }

      return { origin: _folderPath, fileName, path };
    });
  }

  function _getFilePaths(folderPath) {
    const entryPaths = fs
      .readdirSync(folderPath)
      .filter(entry => !ignoreFiles.some(t => t.test(entry)))
      .map(entry => path.join(folderPath, entry));
    const filePaths = entryPaths.filter(entryPath =>
      fs.statSync(entryPath).isFile()
    );
    const dirPaths = entryPaths.filter(
      entryPath => !filePaths.includes(entryPath)
    );
    const dirFiles = dirPaths.reduce(
      (prev, curr) => prev.concat(_getFilePaths(curr)),
      []
    );
    return [...filePaths, ...dirFiles];
  }
};

module.exports = scanFiles;
