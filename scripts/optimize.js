const { src, dest } = require("gulp")
const debug = require("gulp-debug").default
const webp = require("gulp-webp").default

const optimize = () => src([
    `generated/meta/*.png`,
    `generated/sprites/*.png`,
  ], { base: "generated", encoding: false })
  .pipe(debug())
  .pipe(webp())
  .pipe(dest("src/assets"))

/**
 * `gulp optimize`
 */
module.exports = optimize
