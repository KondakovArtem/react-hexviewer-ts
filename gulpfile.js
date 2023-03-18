const { task, watch, series, parallel, dest, src } = require("gulp");
var run = require("gulp-run");
const modifyFile = require("gulp-modify-file");

const del = require("del");

const BUILD_FOLDER = "dist";

/* COMMON */

task("clean", () => {
  return del(BUILD_FOLDER);
});

/* TYPESCRIPT */

task("ts", () => {
  return run("npm run tsc").exec();
});

task("copy-package.json", () => {
  return src(["package.json"]) // src(['src/**/*.ts'])
    .pipe(
      modifyFile((content, path, file) => {
        const packageJson = JSON.parse(content);
        delete packageJson.devDependencies;
        delete packageJson.scripts;
        packageJson.peerDependencies = packageJson.dependencies
        delete packageJson.dependencies;
        packageJson.dependencies = {
          "buffer": "^6.0.3"
        };
        return JSON.stringify(packageJson, null, '\t');
      })
    )
    .pipe(dest(BUILD_FOLDER));
});

task("copy", () => {
  return src(["README.md"]) // src(['src/**/*.ts'])
    .pipe(dest(BUILD_FOLDER));
});

task("copy-styles", () => {
  return src(["./src/less/**/*.*", "./src/scss/**/*.*"], { base: "./src" }) // src(['src/**/*.ts'])
    .pipe(dest(BUILD_FOLDER));
});

task("watchTs", () => {
  watch(["src/**/*.ts", "src/**/*.d.ts"], series("ts"));
});

/* DEFAULT/ENTRY */
task(
  "build",
  series("clean", "ts", "copy", "copy-package.json", "copy-styles")
);
task("watch", parallel(["watchTs"]));
task("default", series("build"));
