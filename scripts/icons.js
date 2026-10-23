const { src, dest } = require("gulp")
const svgmin = require("gulp-svgmin")

const paths = {
  in: "node_modules/linearicons/dist/svg/*.svg",
  out: "generated/icons",
}

const svgoConfig = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,
          convertColors: { currentColor: true },
        },
      },
    },
    "removeDimensions",
  ],
}

/**
 * Optimize the linear icons set with SVGO.
 */
const icons = () => src(paths.in)
  .pipe(svgmin(svgoConfig))
  .pipe(dest(paths.out))

/**
 * `gulp icons`
 */
module.exports = icons
