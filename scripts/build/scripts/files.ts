import type { Config, Manifest } from "../type"
import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { tsconfigBuild, tsdownConfig } from "../template"

export async function writeFiles(root: string, config: Config): Promise<void> {
  await writeFile(join(root, "tsdown.config.ts"), tsdownConfig(config), "utf8")
  await writeFile(join(root, "tsconfig.build.json"), tsconfigBuild(config), "utf8")
  await patchManifest(root, config)
}

async function patchManifest(root: string, config: Config): Promise<void> {
  const file = join(root, "package.json")
  const manifest = JSON.parse(await readFile(file, "utf8")) as Manifest

  manifest.files = [config.outDir, "README.md"]
  manifest.scripts = { ...manifest.scripts, build: "tsdown", prepack: "pnpm build" }

  await writeFile(file, `${JSON.stringify(manifest, null, 2)}\n`, "utf8")
}
