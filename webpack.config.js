module.exports = {
	// モード値を production に設定すると最適化された状態で、development に設定するとソースマップ有効でJSファイルが出力される
	mode: "production",
	// mode: "development",

	// watchモード有効
	watch: true,
 devServer: {
    contentBase: "dist",
    open: true // 自動的にブラウザが立ち上がる
  },

	// メインとなるJSファイル（エントリーポイント）
	entry: "./src/js/main.js",

	//出力するJSファイル
	output: {
		filename: "main.js"
	},

	module: {
		rules: [{
			// 拡張子 .js の場合
			test: /\.js$/,
			use: [{
				// Babel を利用する
				loader: "babel-loader",
				// Babel のオプションを指定する
				options: {
					presets: [
						// プリセットを指定することで、ES2020をES5に変換
						"@babel/preset-env",
					],
				},
			}, ],
		}, ],
	},
	// ES5(IE11等)向けの指定
	target: ["web", "es5"],
};