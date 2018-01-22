import * as webpack from "webpack";
import * as path from "path";
import * as merge from "webpack-merge";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import { config } from "./webpack.config";

export default merge(config, {
  entry: ["react-hot-loader/patch", "./src/index.tsx"],

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      chunksSortMode: "dependency",
      template: path.resolve(__dirname, "./src/index.ejs")
    })
  ],

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    compress: true,
    port: 3000
  }
});
