const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = () => {
  return {
    mode: "production",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Just Another Text Editor",
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "J.A.T.E.",
        description: "Take notes with JavaScript syntax highlighting!",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        id: "/",
        start_url: "/",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
        screenshots: [
          {
            src: "./assets/screenshot/screenshot.png",
            sizes: "1920x1080",
            type: "image/png",
            label: "Just Another Text Editor!",
          },
          {
            src: "./assets/screenshot/screenshot.png",
            sizes: "1920x1080",
            type: "image/png",
            label: "Just Another Text Editor!",
            form_factor: "wide",
          },
        ],
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/images/screenshot.png",
            to: "assets/screenshot/screenshot.png",
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
