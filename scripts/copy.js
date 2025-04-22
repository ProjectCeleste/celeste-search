const { src, dest } = require("gulp")
const debug = require("gulp-debug")

/**
 * Copies assets that don't need compression, nor any other
 * form of optimization.
 */
const copy = () => src([
  `generated/**/*.scss`,
], { base: "generated" })
  .pipe(debug())
  .pipe(dest("src/assets"))

/**
 * Copies font files from node_modules to assets directory
 */
const copyFonts = () => src([
  `node_modules/typeface-lato/files/*.woff2`,
  `node_modules/typeface-lato/files/*.woff`,
], { base: "node_modules/typeface-lato/files" })
  .pipe(debug())
  .pipe(dest("src/assets/fonts"))

/**
 * `gulp copy`
 */
module.exports = copy

/**
 * `gulp copyFonts`
 */
module.exports.copyFonts = copyFonts
