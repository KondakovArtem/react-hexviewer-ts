const { task, watch, series, parallel, dest, src } = require("gulp");
var run = require('gulp-run');
const del = require("del");

const BUILD_FOLDER = "dist";

/* COMMON */

task("clean", () => {
  return del(BUILD_FOLDER);
});

/* TYPESCRIPT */

task("ts", () => {
  return run('npm run tsc').exec();
});

task("copy", () => {
  return src(["package.json", "README.md"]) // src(['src/**/*.ts'])
    .pipe(dest(BUILD_FOLDER));
});

task("copy-styles", () => {
  return src(["./less/**/*.*", "./scss/**/*.*"], { base: "./" }) // src(['src/**/*.ts'])
    .pipe(dest(BUILD_FOLDER));
});

task("watchTs", () => {
  watch(["src/**/*.ts", "src/**/*.d.ts"], series("ts"));
});

/* DEFAULT/ENTRY */
task("build", series("clean", "ts", "copy", "copy-styles"));
task("watch", parallel(["watchTs"]));
task("default", series("build"));
