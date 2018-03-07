import * as webpack from "webpack";
import * as path from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as CopyWebpackPlugin from "copy-webpack-plugin";

//common
export const config: webpack.Configuration = {
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new CopyWebpackPlugin([{ from: "src/favicon", to: "" }])
  ],

  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.(svg|jpg|jpeg|png)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]"
          }
        }
      },

      {
        test: /\.(eot|woff|woff2|ttf)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]"
          }
        }
      },

      {
        test: /\.ya?ml$/,
        include: path.resolve("data"),
        loaders: ["json-loader", "yaml-loader"]
      },

      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.tsx?$/,
        loaders: ["react-hot-loader/webpack", "awesome-typescript-loader"],
        exclude: path.resolve(__dirname, "node_modules"),
        include: path.resolve(__dirname, "src")
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  }
};
