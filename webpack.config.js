// @ts-check

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const paths = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  html: path.resolve(__dirname, "src", "index.html"),
  locales: path.resolve(__dirname, "src", "static", "locales"),
  target: path.resolve(__dirname, "public"),
};

const rules = {
  typescript: {
    test: /\.tsx?$/,
    loader: "ts-loader",
  },
  webp: {
    test: /\.webp$/,
    loader: "file-loader",
    options: {
      name: "[name].[ext]",
    },
  },
};

const plugins = {
  clean: new CleanWebpackPlugin(),
  html: new HtmlWebpackPlugin({
    template: paths.html,
  }),
  copy: new CopyWebpackPlugin({
    patterns: [{ from: paths.locales, to: path.join(paths.target, "locales") }],
  }),
};

module.exports = {
  entry: paths.entry,
  output: {
    filename: "app.js",
    path: paths.target,
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [rules.typescript, rules.webp],
  },
  plugins: [plugins.clean, plugins.copy, plugins.html],
};
