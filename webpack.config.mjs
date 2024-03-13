// @ts-check
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

const paths = {
  entry: path.resolve(import.meta.dirname, "src", "index.tsx"),
  html: path.resolve(import.meta.dirname, "src", "index.html"),
  locales: path.resolve(import.meta.dirname, "src", "static", "locales"),
  target: path.resolve(import.meta.dirname, "public"),
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
      name: "[name]-[contenthash].[ext]",
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

export default {
  entry: paths.entry,
  output: {
    filename: "app-[contenthash].js",
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
