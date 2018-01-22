import * as webpack from "webpack";
import * as path from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as merge from "webpack-merge";
import * as compiler from "babel-minify-webpack-plugin";
import { config } from "./webpack.config";

export default merge(config, {
  entry: "./src/index.tsx",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),

    new compiler(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.ejs")
    })
  ]
});
