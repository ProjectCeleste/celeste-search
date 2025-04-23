const { src, dest, parallel } = require("gulp")
const { sharpStream } = require("./utils/sharp-utils")
const spritesmith = require("gulp.spritesmith")

function toRoundedPercent(value) {
  return (value * 100)
    .toFixed(6)
    .replace(/0+$/, "")
    .replace(/\.$/, "")
    .replace(/(.*)/, "$1%")
    .replace(/^0%$/, "0")
}

/**
 * Generates the CSS for a sprite.
 */
const cssTemplate = (name, size) => data => {
  const sharedClass = [
    `.icon--${name} {`,
    `  display: block;`,
    `  background-image: url("/assets/sprites/${name}.webp");`,
    `  background-repeat: no-repeat;`,
    `  background-position: -100% -100%;`,
    `  background-clip: padding-box;`,
    `  width: ${size}px;`,
    `  height: ${size}px;`,
    `  max-width: 100%;`,
    `  overflow: hidden;`,
    `}`,
  ].join("\n")

  data.sprites.sort((a, b) => {
    if (a.offset_x !== b.offset_x) {
      return b.offset_x - a.offset_x
    }
    return b.offset_y - a.offset_y
  })

  const iconSelectorLength
    = 10
    + name.length
    + Math.max(...data.sprites.map(s => s.name.length))

  const iconClasses = data.sprites.map(entry => {
    const { x, y, width, total_width, height, total_height } = entry
    const percentY = toRoundedPercent(y / (total_height - height) || 0)
    const percentX = toRoundedPercent(x / (total_width - width) || 0)

    return [
      `.icon--${name}--${entry.name}`.padEnd(iconSelectorLength) + "{",
      `  background-position: ${percentX} ${percentY};`.trim(),
      `}`,
    ].join(" ")
  }).join("\n")

  return [
    sharedClass,
    iconClasses,
  ].join("\n") + "\n"
}

/**
 * Generates a single sprite.
 */
const sprite = (name, size) => {
  const paths = {
    in: `generated/sprites/${name}/*.png`,
    out: "generated/sprites",
  }
  const config = { base: "generated" }
  const imageSizes = {
    width: size,
    height: size,
    quality: 100,
  }
  const imageConfig = {
    silent: true,
  }

  const fn = () => src(paths.in, config)
    .pipe(sharpStream({ 
      images: [{ 
        width: size, 
        height: size, 
        quality: 100 
      }], 
      silent: true 
    }))
    .pipe(spritesmith({
      imgName: `${name}.png`,
      cssName: `${name}.scss`,
      cssTemplate: cssTemplate(name, size),
      algorithm: "binary-tree",
    }))
    .pipe(dest(paths.out))
    .pipe(dest("src/assets/sprites"))

  fn.displayName = `sprites.${name}`

  return fn
}

/**
 * `gulp sprites`
 */
module.exports = parallel(
  sprite("materials", 64),
  sprite("items", 64),
  sprite("advisors", 64),
  sprite("blueprints", 64),
  sprite("consumables", 64),
  sprite("designs", 64)

)
