import process from "node:process"
import { log } from "@xtwis/ohstart-dev"
import argv from "./argv"
import { resolveConfig } from "./scripts/defaults"
import { writeFiles } from "./scripts/files"
import { install } from "./scripts/install"
import { assertNoConflicts } from "./scripts/preflight"
import { findRoot } from "./scripts/root"

const { getArgv } = argv

export default async function main() {
  try {
    const argv = getArgv()
    const root = findRoot(process.cwd())

    if (!root)
      throw new Error("未找到 package.json, 请在项目目录内执行")

    const config = await resolveConfig(argv, root)

    assertNoConflicts(root, ["tsdown.config.ts", "tsconfig.build.json"], config.force)

    await writeFiles(root, config)
    await install(root)

    log.out(`已安装 tsdown 构建套件于 ${root}`)
  }
  catch (error) {
    log.error(error instanceof Error
      ? error.message
      : String(error))
    process.exitCode = 1
  }
}
