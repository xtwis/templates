import type { Manifest } from "../type"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export async function loadManifest(root: string): Promise<Manifest> {
  const file = join(root, "package.json")
  return JSON.parse(await readFile(file, "utf8")) as Manifest
}

export function configFile(manifest: Manifest): string {
  return manifest.type === "module"
    ? "ohdoc.config.ts"
    : "ohdoc.config.mts"
}
