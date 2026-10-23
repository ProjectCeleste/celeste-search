const { src, dest, series, parallel } = require("gulp")
const { execa } = require("execa")
const replace = require("gulp-replace")

const dist = "dist/celeste-search/browser"

function app() {
  return execa("npx", ["ng", "build", "-c", "production"], { stdio: "inherit" })
}

function sitemap() {
  return src("src/sitemap.xml")
    .pipe(replace(/__LASTMOD__/g, new Date().toISOString()))
    .pipe(dest(dist))
}

async function robots() {
  if (process.env.CONTEXT !== "production") {
    return
  }

  return src(`${dist}/robots.txt`)
    .pipe(replace(/Disallow:.*/, "Disallow:"))
    .pipe(dest(dist))
}

module.exports = series(app, parallel(sitemap, robots))
