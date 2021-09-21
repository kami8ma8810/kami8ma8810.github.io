const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  // mode: 'development',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './public/assets/js'),
    filename: 'main.js',
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     minSize: 0, //defaultは30000
  //     cacheGroups: {
  //       vendor: {
  //         //vendorは任意名
  //         test: /node_modules/,
  //         name: 'vendor',
  //       },
  //       vendorsModules: {
  //         //vendorModulesは任意名
  //         test: /src[\\/]js[\\/]modules/,
  //         name: 'vendor-modules',
  //       },
  //       default: false,
  //     },
  //   },
  // },
  module: {
    rules: [
      //追加
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            // options: {
            //   presets: ['@babel/preset-env'],
            // },
          },
        ],
      },
    ],
  },
  plugins: [
    // 複数のJSファイルでインポートしているjQueryをまとめる
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
    }),
    new webpack.ProvidePlugin({
      gsap: 'gsap',
      ScrollTrigger: 'gsap/ScrollTrigger',
    }),
  ],
  performance: {
    maxAssetSize: 100000,
  },
};
