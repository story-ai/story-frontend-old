import * as webpack from "webpack";
import * as path from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as merge from "webpack-merge";
import * as compiler from "babel-minify-webpack-plugin";
import { config } from "./webpack.config";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";

console.log("======STAGING======");
export default merge(config, {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.STAGING": JSON.stringify("true")
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),

    new compiler(),
    new HtmlWebpackPlugin({
      production: true,
      template: path.resolve(__dirname, "./src/index.ejs")
    })
  ]
});
