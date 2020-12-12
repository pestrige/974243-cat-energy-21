const gulp = require("gulp");
const htmlmin = require('gulp-htmlmin');
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const sprite = require("gulp-svgstore");
const del = require("del");
const sync = require("browser-sync").create();

// Html

const html = () => {
  return gulp.src("./source/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("./build"))
}

exports.html = html;

// Styles

const styles = () => {
  return gulp.src("./source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("./build/css"));
}

exports.styles = styles;

// Scripts

const scripts = () => {
  return gulp.src("./source/js/*.js")
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest("./build/js"))
}

exports.scripts = scripts;

// Images

const images = () => {
  return gulp.src("./source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({quality: 80, progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("./build/img"))
}

exports.images = images;

// Webp

const createWebp = () => {
  return gulp.src([
    "./source/img/**/*.{jpg,png}",
    "!./source/img/bg/*.{jpg,png}"])
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("./build/img"))
}

exports.createWebp = createWebp;

// SVG sprite

const createSprite = () => {
  return gulp.src("./source/img/icons/*.svg")
    .pipe(sprite())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("./build/img/icons"))
}

exports.createSprite = createSprite;

// Clean

const clean = () => {
  return del("./build");
};

// Copy

const copy = (done) => {
  gulp.src([
    "./source/fonts/*.{woff2,woff}",
    "./source/img/**/*.{jpg,png,svg}",
    "!./source/img/icons/*.svg"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("./build"))
  done();
};

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "./build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = done => {
  sync.reload();
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("./source/sass/**/*.scss", gulp.series(styles, reload));
  gulp.watch("./source/*.html", gulp.series(html, reload));
  gulp.watch("./source/js/*.js", gulp.series(scripts, reload));
}

exports.default = gulp.series(
  clean,
  copy,
  gulp.parallel(
    createSprite,
    createWebp,
    html,
    styles,
    scripts),
  server,
  watcher
);

// Build

const build = gulp.series(
  clean,
  copy,
  gulp.parallel(
    images,
    createWebp,
    createSprite,
    html,
    styles,
    scripts
  )
);

exports.build = build;
