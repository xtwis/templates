import type { Config } from "../type"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { nvmrc, packageJson, readme } from "../template"

const ASSETS = new URL("./assets/", import.meta.url)

async function copyAsset(root: string, asset: string, target: string): Promise<void> {
  const content = await readFile(new URL(asset, ASSETS), "utf8")
  await writeFile(join(root, target), content, "utf8")
}

export async function writeFiles(root: string, config: Config): Promise<void> {
  await mkdir(join(root, "src"), { recursive: true })

  await writeFile(join(root, ".nvmrc"), nvmrc(config), "utf8")
  await writeFile(join(root, "package.json"), packageJson(config), "utf8")
  await writeFile(join(root, "README.md"), readme(config), "utf8")
  await copyAsset(root, "pnpm-workspace.yaml.txt", "pnpm-workspace.yaml")
  await copyAsset(root, "tsconfig.json.txt", "tsconfig.json")
  await copyAsset(root, "index.ts.txt", "src/index.ts")
}
