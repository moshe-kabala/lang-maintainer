const default_configuration = {
  ignore: [/^lib$/, /^node_modules$/, /^dist$/],
  checkFiles: [{ test: /\.tsx?$|\.jsx?$/, handler: "js" }]
};

function getRootConfiguration() {
  // todo get the configuration from the local or args
  // also check if the configuration is valid

  let path;
  let currentDir = process.cwd();

  try {
    path = `${currentDir}/langconf.js`;
    const { ignore = [], checkFiles = [] } = require(path);
    return {
      ignore: [...default_configuration.ignore, ...ignore],
      checkFiles: [...checkFiles, ...default_configuration.checkFiles]
    };
  } catch (err) {
    console.error(`Not found langconf.json file at ${currentDir}`);
    process.exit(2);
  }
}


module.exports = getRootConfiguration