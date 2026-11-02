import process from "node:process"
import { log } from "@xtwis/ohstart-dev"
import argv from "./argv"
import { writeFiles } from "./scripts/files"
import { fix } from "./scripts/fix"
import { install } from "./scripts/install"
import { configFile, loadManifest } from "./scripts/manifest"
import { assertNoConflicts } from "./scripts/preflight"
import { findRoot } from "./scripts/root"

const { getArgv } = argv

export default async function main() {
  try {
    const { flags } = getArgv()
    const root = findRoot(process.cwd())

    if (!root)
      throw new Error("未找到 package.json, 请在项目目录内执行")

    const manifest = await loadManifest(root)
    const target = configFile(manifest)

    assertNoConflicts(root, [target], flags.force)

    await writeFiles(root, manifest)
    await install(root)

    if (flags.fix)
      await fix(root)

    log.out(`已安装 antfu eslint 配置于 ${root} (${target})`)
  }
  catch (error) {
    log.error(error instanceof Error
      ? error.message
      : String(error))
    process.exitCode = 1
  }
}
