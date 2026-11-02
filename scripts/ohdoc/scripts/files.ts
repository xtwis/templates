import type { Config, Manifest } from "../type"
import { writeFile } from "node:fs/promises"
import { join } from "node:path"
import { ohdocConfig } from "../template"
import { configFile } from "./manifest"

export async function writeFiles(root: string, config: Config, manifest: Manifest): Promise<void> {
  await writeFile(join(root, configFile(manifest)), ohdocConfig(config), "utf8")
  await patchManifest(root, manifest)
}

async function patchManifest(root: string, manifest: Manifest): Promise<void> {
  manifest.scripts = { ...manifest.scripts, docs: "ohdoc dev" }

  await writeFile(join(root, "package.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8")
}
