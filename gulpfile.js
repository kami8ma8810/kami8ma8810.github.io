const { src, dest, watch, lastRun, series, parallel } = require("gulp");

const fs = require("fs"); //Node.jsでファイルを操作するための公式モジュール

// html
const htmlMin = require("gulp-htmlmin");
const prettify = require("gulp-prettify");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const replace = require("gulp-replace");

// Sass
const sass = require("gulp-dart-sass");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const postCss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const gcmq = require("gulp-group-css-media-queries");
const cssNano = require("gulp-cssnano");

// JavaScript
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const terser = require("gulp-terser"); //ES6対応圧縮
// webpack
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const webpackStream = require("webpack-stream"); // gulpでwebpackを使うために必要なプラグイン

// 画像圧縮
const imageMin = require("gulp-imagemin");
const pngQuant = require("imagemin-pngquant");
const mozJpeg = require("imagemin-mozjpeg");
const svgo = require("gulp-svgo");
const webp = require("gulp-webp"); //webpに変換

// ブラウザ同期
const browserSync = require("browser-sync").create();

//パス設定
const paths = {
  html: {
    src: ["./src/ejs/**/*.ejs", "!" + "./src/ejs/**/_*.ejs"],
    dist: "./public/",
    watch: "./src/ejs/**/*.ejs",
  },
  styles: {
    src: "./src/scss/**/*.scss",
    copy: "./src/scss/vendors/*.{css,scss}",
    dist: "./public/assets/css/",
    map: "./map",
  },
  scripts: {
    src: ["./src/js/**/*.js", "!" + "./src/js/**/vendors/*.js"], //外部のライブラリファイルはコンパイルしないでコピーする
    copy: "./src/js/**/vendors/*.js",
    dist: "./public/assets/js/",
  },
  images: {
    src: "./src/images/**/*.{jpg,jpeg,png,gif,svg}",
    srcWebp: "./src/images/**/*.{jpg,jpeg,png}",
    dist: "./public/assets/images/",
    distWebp: "./public/assets/images/webp/",
  },
  fonts: {
    src: "./src/fonts/**/*.{off,ttf,woff,woff2}",
    dist: "./public/assets/fonts/",
  },
  clean: {
    all: "./public/",
    assets: ["./public/assets/css/", "./public/assets/js/"],
    images: "./public/assets/images/",
  },
};

// ejsコンパイル
const htmlFunc = () => {
  const data = JSON.parse(fs.readFileSync("./ejs-config.json"));
  return src(paths.html.src)
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>"),
      })
    )
    .pipe(ejs(data)) //ejsをまとめる
    .pipe(
      rename({
        extname: ".html",
      })
    ) //拡張子をhtmlに
    .pipe(
      htmlMin({
        removeComments: true, //コメントを削除
        collapseWhitespace: true, //余白を詰める
        collapseInlineTagWhitespace: true, //inline要素のスペース削除（spanタグ同士の改行などを詰める
        preserveLineBreaks: true, //タグ間の余白を詰める
      })
    )
    .pipe(
      prettify({
        indent_size: 2,
        indent_with_tabs: true,
      })
    )
    .pipe(replace(/[\s\S]*?(<!DOCTYPE)/, "$1"))
    .pipe(dest(paths.html.dist))
    .pipe(browserSync.stream());
};

// Sassコンパイル
const sassCompile = () => {
  return (
    src(paths.styles.src, {
      // sourcemaps: true,
      sourcemaps: false,
    })
      .pipe(
        plumber({
          errorHandler: notify.onError("Error: <%= error.message %>"),
        })
      )
      .pipe(
        sass({
          // outputStyle: 'expanded',
          outputStyle: "compressed",
        }).on("error", sass.logError)
      )
      .pipe(
        postCss([
          autoprefixer({
            // プロパティのインデントを整形しない
            cascade: false,
            // IE11のgrid対応
            grid: "autoplace",
          }),
        ])
      )
      //メディアクエリをまとめる
      .pipe(gcmq())
      //圧縮
      .pipe(cssNano())
      .pipe(
        dest(paths.styles.dist, {
          sourcemaps: "./map",
        })
      )
      .pipe(browserSync.stream())
  );
};

// JavaScriptコンパイル
const jsBabel = () => {
  return (
    src(paths.scripts.src)
      .pipe(
        plumber({
          errorHandler: notify.onError("Error: <%= error.message %>"),
        })
      )
      .pipe(
        // Babel変換
        babel({
          presets: ["@babel/preset-env"],
        })
      )
      // JS圧縮
      // .pipe(uglify())
      .pipe(terser())
      .pipe(dest(paths.scripts.dist))
  );
};

// webpack
const bundleJs = (done) => {
  //webpackStreamの第2引数にwebpackを渡す
  webpackStream(webpackConfig, webpack).pipe(dest(paths.scripts.dist));
  done();
};

// 画像圧縮
const imagesCompress = () => {
  return src(paths.images.src, {
    since: lastRun(imagesCompress),
  })
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>"),
      })
    )
    .pipe(
      imageMin(
        [
          mozJpeg({
            quality: 80,
          }),
          pngQuant(
            [0.6, 0.8] //画質の最小,最大
          ),
        ],
        {
          verbose: true, //メタ情報削除
        }
      )
    )
    .pipe(
      svgo({
        plugins: [
          {
            removeViewbox: false, //フォトショやイラレで書きだされるviewboxを消すかどうか※表示崩れの原因になるのでfalse推奨。以降はお好みで。
          },
          {
            removeMetadata: false, //<metadata>を削除するかどうか
          },
          {
            convertColors: false, //rgbをhexに変換、または#ffffffを#fffに変換するかどうか
          },
          {
            removeUnknownsAndDefaults: false, //不明なコンテンツや属性を削除するかどうか
          },
          {
            convertShapeToPath: false, //コードが短くなる場合だけ<path>に変換するかどうか
          },
          {
            collapseGroups: false, //重複や不要な`<g>`タグを削除するかどうか
          },
          {
            cleanupIDs: false, //SVG内に<style>や<script>がなければidを削除するかどうか
          },
          // {
          //   mergePaths: false,//複数のPathを一つに統合
          // },
        ],
      })
    )
    .pipe(dest(paths.images.dist));
};

// webp変換
const webpConvert = () => {
  return src(paths.images.srcWebp, {
    since: lastRun(webpConvert),
  })
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>"),
      })
    )
    .pipe(webp())
    .pipe(dest(paths.images.distWebp));
};

// JSファイルコピー（vendorsフォルダ
const copyScripts = () => {
  return src(paths.scripts.copy).pipe(dest(paths.scripts.dist));
};
// fontコピー
const copyFonts = () => {
  return src(paths.fonts.src).pipe(dest(paths.fonts.dist));
};

// CSSファイルコピー（vendorsフォルダ
const copyStylesheets = () => {
  return src(paths.styles.copy).pipe(dest(paths.styles.dist));
};

// ローカルサーバー起動
const browserSyncFunc = (done) => {
  browserSync.init({
    //デフォルトのconnectedのメッセージ非表示
    notify: false,
    server: {
      baseDir: "./",
    },
    startPath: "./public/index.html",
    reloadOnRestart: true,
  });
  done();
};

// ブラウザ自動リロード
const browserReloadFunc = (done) => {
  browserSync.reload();
  done();
};

// ファイル削除
const clean = require("gulp-clean");
function cleanAll(done) {
  src(paths.clean.all, { read: false }).pipe(clean());
  done();
}
function cleanCssJs(done) {
  src(paths.clean.assets, { read: false }).pipe(clean());
  done();
}
function cleanImages(done) {
  src(paths.clean.images, { read: false }).pipe(clean());
  done();
}

// ファイル監視
const watchFiles = () => {
  watch(paths.html.watch, series(htmlFunc, browserReloadFunc));
  watch(paths.styles.src, series(sassCompile));
  watch(paths.styles.copy, series(copyStylesheets));
  watch(paths.scripts.src, series(jsBabel, browserReloadFunc));
  watch(paths.scripts.src, series(bundleJs, browserReloadFunc));
  watch(paths.scripts.copy, series(copyScripts, browserReloadFunc));
  watch(
    paths.images.src,
    series(imagesCompress, webpConvert, browserReloadFunc)
  );
  watch(paths.fonts.src, series(copyFonts, browserReloadFunc));
};

// npx gulp実行処理
exports.default = series(
  parallel(
    htmlFunc,
    sassCompile,
    copyStylesheets,
    jsBabel,
    bundleJs,
    copyScripts,
    imagesCompress,
    webpConvert,
    copyFonts
  ),
  parallel(watchFiles, browserSyncFunc)
);

// ファイル削除
exports.cleanAll = series(cleanAll);
exports.cleanCssJs = series(cleanCssJs);
exports.cleanImages = series(cleanImages);

// バンドルのみ
exports.bundle = series(bundleJs);

// webp変換のみ
// exports.webpConvert = series(webpConvert);
