import process from "node:process"
import { log } from "@xtwis/ohstart-dev"
import { findRoot } from "./scripts/root"
import { setupWorkspace } from "./scripts/workspace"

export default async function main() {
  try {
    const root = findRoot(process.cwd())

    if (!root)
      throw new Error("未找到 package.json, 请在项目目录内执行")

    await setupWorkspace(root)

    log.out(`已初始化 whatsnext 任务区于 ${root}`)
  }
  catch (error) {
    log.error(error instanceof Error
      ? error.message
      : String(error))
    process.exitCode = 1
  }
}
