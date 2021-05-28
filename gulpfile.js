const { task, watch, series, parallel, dest, src } = require("gulp");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const del = require('del');

const BUILD_FOLDER = "dist";

/* COMMON */

task("clean", () => {
    return del(BUILD_FOLDER);
});

/* TYPESCRIPT */
const tsProject = ts.createProject("./tsconfig.build.json");

task("ts", () => {
  const tsResult = tsProject
    .src() // src(['src/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write("."))
    .pipe(dest(BUILD_FOLDER));
  return tsResult;
});

task('copy', () => {
  return src(['package.json', 'README.md', 'less', 'scss']) // src(['src/**/*.ts'])
    .pipe(dest(BUILD_FOLDER));
});

task("watchTs", () => {
  watch(["src/**/*.ts", "src/**/*.d.ts"], series("ts"));
});

/* DEFAULT/ENTRY */
task("build", series("clean", "ts", "copy"));
task("watch", parallel(["watchTs"]));
task("default", series("build"));
