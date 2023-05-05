const CopyPlugin = require("copy-webpack-plugin")
const HtmlPlugin = require("html-webpack-plugin")
const DefinePlugin = require("webpack").DefinePlugin

const path = require("path")

require('dotenv').config({ path: './.env' });

module.exports = {
  entry: {
    popup: path.resolve("src/popup/index.tsx"),
    options: path.resolve("src/options/index.tsx"),
    background: path.resolve("src/background/background.ts"),
    contentScript: path.resolve("src/contentScript/contentScript.ts"),
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/
      },
      {
        use: ["style-loader", "css-loader", {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              ident: "postcss",
              plugins: [
                require("tailwindcss"),
                require("autoprefixer"),
              ],
            },
          },
        }],
        test: /\.css$/i,
      },
      {
        type: 'asset/resource',
        test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/,
      },
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve("src/static/manifest.json"), to: path.resolve("dist") },
        { from: path.resolve("src/static/icon.png"), to: path.resolve("dist") },
      ],
    }),
    ...getHtmlPlugins(["popup", "options"]),
    new DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  output: {
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
}

function getHtmlPlugins(chunks) {
  return chunks.map(chunk => {
    return new HtmlPlugin({
      title: chunk,
      filename: `${chunk}.html`,
      chunks: [chunk],
    })
  })
}