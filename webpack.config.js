const Path = require("path");
const Webpack = require("webpack");

module.exports = {
  mode: "production",
  // mode: 'development',
  entry: "./src/js/index.js",
  output: {
    path: Path.resolve(__dirname, "./public/assets/js"),
    filename: "main.js",
  },
  module: {
    rules: [
      //追加
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 複数のJSファイルでインポートしているものをまとめる
    new Webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
    }),
    new Webpack.ProvidePlugin({
      gsap: "gsap",
    }),
    new Webpack.ProvidePlugin({
      ScrollTrigger: "gsap/ScrollTrigger",
      // ScrollTrigger: "@terwanerik/scrolltrigger",
    }),
  ],
  performance: {
    maxAssetSize: 100000,
  },
};
