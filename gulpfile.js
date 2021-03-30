const {
	src,
	dest,
	watch,
	lastRun,
	series,
	parallel
} = require("gulp");

// ファイルの削除
const del = require("del");

// html
const htmlMin = require("gulp-htmlmin");

// Sass
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const postCss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssDeclSort = require("css-declaration-sorter");
const gcmq = require("gulp-group-css-media-queries");
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const fibers = require("fibers");

// JavaScript
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const webpack = require("webpack");
const webpackStream = require("webpack-stream"); //gulpでwebpackを使うためのプラグイン
const webpackConfig = require("./webpack.config");

// 画像圧縮
const imagemin = require("gulp-imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminSvgo = require("imagemin-svgo");

// ブラウザ同期
const browserSync = require("browser-sync").create();

//本番(production)と開発(development)で処理を分ける
// const mode = require("gulp-mode")({
//   modes: ["production", "development"],
//   default: "development",
//   verbose: false
// });

//パス設定
const paths = {
	html: {
		src: "./src/*.html",
		dist: "./dist/",
	},
	styles: {
		src: "./src/scss/**/*.scss",
		dist: "./dist/css/",
		map: "./map",
	},
	scripts: {
		src: "./src/js/**/*.js",
		dist: "./dist/js/",
		map: "./js/map",
		core: "src/js/core/**/*.js",
		app: "src/js/app/**/*.js",
	},
	images: {
		src: "./src/img/**/*.{jpg,jpeg,png,gif,svg}",
		dist: "./dist/img/",
	},
};

// htmlフォーマット
const htmlFormat = () => {
	return src(paths.html.src)
		.pipe(
			plumber({
				errorHandler: notify.onError("Error: <%= error.message %>"),
			})
		)
		.pipe(
			htmlMin({
				removeComments: true, //コメントを削除
				collapseWhitespace: true, //余白を詰める
				preserveLineBreaks: true, //タグ間の改行を詰める
			})
		)
		.pipe(dest(paths.html.dist));
};

// Sassコンパイル
sass.compiler = require("sass");
const compileSass = () => {
	return src(paths.styles.src, {
			sourcemaps: true,
		})
		.pipe(
			plumber({
				errorHandler: notify.onError("Error: <%= error.message %>"),
			})
		)
		.pipe(sassGlob())
		.pipe(
			sass({
				fiber: fibers,
				outputStyle: "expanded",
			}).on("error", sass.logError)
		)
		.pipe(
			postCss([
				autoprefixer({
					cascade: false,
					grid: "autoplace", // IE11のgrid対応('-ms-')
				}),
				cssDeclSort({
					order: "smacss",
				}),
			])
		)
		.pipe(gcmq())
		.pipe(dest(paths.styles.dist))
		.pipe(cleanCss())
		.pipe(
			rename({
				extname: ".min.css",
			})
		)
		.pipe(
			dest(paths.styles.dist, {
				sourcemaps: "./map",
			})
		)
	// .pipe(browserSync.stream());
};

// JavaScriptコンパイル
const jsBabel = () => {
	return src(paths.scripts.src)
		.pipe(
			plumber({
				errorHandler: notify.onError("Error: <%= error.message %>"),
			})
		)
		.pipe(
			babel({
				presets: ["@babel/preset-env"],
			})
		)
		.pipe(dest(paths.scripts.dist))
		.pipe(uglify())
		.pipe(
			rename({
				extname: ".min.js",
			})
		)
		.pipe(dest(paths.scripts.dist));
};

// 画像圧縮
const imagesFunc = () => {
	return src(paths.images.src, {
			since: lastRun(imagesFunc),
		})
		.pipe(
			plumber({
				errorHandler: notify.onError("Error: <%= error.message %>"),
			})
		)
		.pipe(
			imagemin(
				[
					imageminMozjpeg({
						quality: 80,
					}),
					imageminPngquant(
						[0.7, 0.8] //画質の最小,最大
					),
					imageminSvgo({
						plugins: [{
								removeViewbox: false, //フォトショやイラレで書きだされるviewboxを消さない
							},
							{
								removeMetadata: false,
							},
							{
								removeUnknownsAndDefaults: false,
							},
							{
								convertShapeToPath: false,
							},
							{
								collapseGroups: false,
							},
							{
								cleanupIDs: false,
							},
						],
					}),
				], {
					verbose: true, //メタ情報削除
				}
			)
		)
		.pipe(dest(paths.images.dist));
};

// ローカルサーバー起動
const browserSyncFunc = () => {
	browserSync.init({
		notify: false, //connectedのメッセージ非表示
		server: {
			baseDir: "./",
		},
		startPath: "./dist/index.html",
		reloadOnRestart: true,
	});
};

// ブラウザ自動リロード
const browserReloadFunc = (done) => {
	browserSync.reload();
	done();
};
const browserReloadStream = (done) => {
	browserSync.stream();
	done();
};

// ファイル監視
const watchFiles = () => {
	watch(paths.html.src, series(htmlFormat, browserReloadFunc));
	watch(paths.styles.src, series(compileSass, browserReloadFunc));
	watch(paths.scripts.src, series(jsBabel, browserReloadFunc));
	// watch(paths.scripts.src, series(bundleJs, browserReloadFunc));
	// watch(paths.scripts.src, bundleJs);
	watch(paths.images.src, series(imagesFunc, browserReloadFunc));
};

// マップファイル除去
const cleanMap = () => {
	return del([paths.styles.map, paths.scripts.map]);
};

// npx gulp実行処理
exports.default = parallel(watchFiles, browserSyncFunc);
exports.cleanmap = cleanMap;