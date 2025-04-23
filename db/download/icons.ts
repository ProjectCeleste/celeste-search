import crypto from "crypto"
import { copy, mkdirp } from "fs-extra"
import nanoid from "nanoid"
import { dirname } from "path"
import chalk from "chalk"

import { download } from "./download"

const pathToId: { [iconPath: string]: Promise<string> } = {}

export async function downloadIcon(resource: string, spriteName: string, iconName?: string): Promise<string> {
  if (resource.startsWith("local:")) {
    const path = resource.substr(resource.indexOf(":") + 1)
    return pathToId[resource + spriteName]
      = pathToId[resource + spriteName] || fetchLocalOverride(path, spriteName, iconName)
  }

  return pathToId[resource + spriteName]
    = pathToId[resource + spriteName] || fetch(resource, spriteName, iconName)
}

function hash(data: string): string {
  return crypto
    .createHash("sha1")
    .update(data)
    .digest("base64")
    .replace(/[\W]/g, "")
    .substr(0, 8)
}

async function fetch(path: string, spriteName: string, iconName?: string) {
  const iconId = hash(path)
  const imagePath = path.replace(/\\/g, "/") + ".png"
  const spriteInput = `generated/sprites/${spriteName}/${iconName || iconId}.png`
  const url = `https://images.projectceleste.com/${imagePath}`

  const filename = await download(url, { responseType: 'arraybuffer' })
  if (!filename) {
    throw new Error(`Failed to download icon from ${url}`)
  }
  await mkdirp(dirname(spriteInput))
  await copy(filename, spriteInput)

  return iconId
}

async function fetchLocalOverride(path: string, spriteName: string, iconName?: string): Promise<string> {
  const iconId = hash(path)
  const imagePath = path.replace(/\\/g, "/") + ".png"
  const spriteInput = `generated/sprites/${spriteName}/${iconName || iconId}.png`
  await mkdirp(dirname(spriteInput))
  await copy(imagePath, spriteInput)
  return iconId
}
