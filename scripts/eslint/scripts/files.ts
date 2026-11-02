import type { Manifest } from "../type"
import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { configFile } from "./manifest"

const ASSETS = new URL("./assets/", import.meta.url)

export async function writeFiles(root: string, manifest: Manifest): Promise<void> {
  const content = await readFile(new URL("eslint.config.txt", ASSETS), "utf8")
  await writeFile(join(root, configFile(manifest)), content, "utf8")
  await patchManifest(root, manifest)
}

async function patchManifest(root: string, manifest: Manifest): Promise<void> {
  manifest.scripts = { ...manifest.scripts, lint: "eslint .", fix: "eslint . --fix" }

  await writeFile(join(root, "package.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8")
}
