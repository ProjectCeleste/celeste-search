const { src, dest, series, parallel } = require("gulp")
const { writeFile, ensureDir } = require("fs-extra")
const webp = require('gulp-webp')
const debug = require("gulp-debug")
const del = require("del")
const { sharpStream } = require("./utils/sharp-utils")

const ratio = 9 / 16
const sourceWidth = 2048
const paths = {
  in: "assets/yggdrasil.png",
  out: "generated/bg",
}

/**
 * Determines the images sizes for Sharp processing.
 */
function buildImagesConfigs(exponents) {
  const images = []

  exponents.forEach(exponent => {
    const width = Math.round(sourceWidth * Math.pow(ratio, exponent - 1))
    const height = Math.round(sourceWidth * Math.pow(ratio, exponent))
    const size = height

    // 16:9
    images.push({
      rename: `bg-${width}-${height}.webp`,
      width,
      height,
    })

    // 1:1
    images.push({
      rename: `bg-${size}.webp`,
      width: size,
      height: size,
      quality: 100,
    })
  })

  return images.sort((a, b) => (b.width - b.height) - (a.width - a.height))
}

/**
 * Builds a CSS string containing media queries for the different
 * image sizes.
 */
const buildMediaQueries = images => {
  const rules = []
  const indent = "  "
  const eol = "\n"

  function addRule(...lines) {
    rules.push(lines.map(line => indent + line).join(eol))
  }

  images.forEach(({ rename, width, height }) => {
    const bgImage
      = `background-image: url("/assets/bg/${rename}");`

    if (!rules.length) {
      addRule(bgImage)
    } else if (width !== height) {
      addRule(
        `@media (max-width: ${width}px) and (max-height: ${height}px) {`,
        indent + `${bgImage}`,
        `}`)
    } else {
      addRule(
        `@media (max-aspect-ratio: 1/1) and (max-height: ${height}px) {`,
        indent + `${bgImage}`,
        `}`)
    }
  })

  return `@import "imports";

body {
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: $theme-primary;
${rules.join(eol + eol)}
}
`
}

/**
 * Deletes previously generated background images.
 */
const deleteBGs = () => del(paths.out + "/*")

/**
 * Generates multiple sizes of background images.
 */
async function generateBGs(done) {
  const images = buildImagesConfigs([1, 1.25, 1.5, 2])

  const writeImages = () => src(paths.in)
    .pipe(sharpStream({ images, silent: true }))
    .pipe(webp())
    .pipe(debug())
    .pipe(dest(paths.out))
    .pipe(dest("src/assets/bg"))

  async function writeCSS() {
    const scss = buildMediaQueries(images)

    await ensureDir(paths.out)
    return writeFile(paths.out + "/bg.scss", scss, "utf8")
  }

  return parallel(writeCSS, writeImages)(done)
}

/**
 * `gulp bg`
 */
module.exports = series(deleteBGs, generateBGs)
