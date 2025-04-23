import { copy, ensureDir, remove, writeFile } from "fs-extra"

import { buildAdvisors } from "./advisors/build"
import { buildBlueprints } from "./blueprints/build"
import { buildConsumables } from "./consumables/build"
import { buildDesigns } from "./designs/build"
import { buildItems } from "./items/build"
import { buildMaterials, buildSharedMaterials } from "./materials/build"

async function cleanup() {
  console.log("Cleanup...")

  const dirs = [
    "generated",
    "generated/db",
    "src/app/interfaces",
    "src/assets/db",
  ]

  for (const dir of dirs) {
    await ensureDir(dir)
    await remove(dir)
    await ensureDir(dir)
  }
}

async function writeDBFiles(filename: string, data: any) {
  console.log(`Writing ${filename}`)
  await writeFile(`generated/db/${filename}.json`, JSON.stringify(data, null, 2), "utf8")
  await writeFile(`src/assets/db/${filename}.json`, JSON.stringify(data), "utf8")
}

async function createDB() {
  console.log("Build...")

  const items = await buildItems()
  await writeDBFiles('items', items)

  console.log('Starting Building advisors')
  const advisors = await buildAdvisors()
  await writeDBFiles('advisors', advisors)

  const blueprints = await buildBlueprints()
  await writeDBFiles('blueprints', blueprints)

  const designs = await buildDesigns()
  await writeDBFiles('designs', designs)

  const consumables = await buildConsumables()
  await writeDBFiles('consumables', consumables)

  const materials = await buildMaterials()
  await writeDBFiles('materials', materials)

  const sharedMaterials = await buildSharedMaterials(items, blueprints, designs)
  await writeDBFiles('shared', { materials: sharedMaterials })
}

async function copyInterfaces() {
  console.log("Copy...")

  await copy("db/interfaces", "src/app/interfaces")
}

async function buildAndSaveDB() {
  await cleanup()
  await createDB()
  await copyInterfaces()
}

buildAndSaveDB()
