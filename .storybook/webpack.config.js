const path = require("path");
const rootPath = path.resolve(__dirname, '../');

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "sass-loader"],
    include: path.resolve(__dirname, "../")
  });

  config.module.rules.push({
    test: /\.pug$/,
    use: ["pug-plain-loader"],
    include: path.resolve(__dirname, "../")
  });

  config.resolve.alias["@"] = rootPath;

  return config;
};
