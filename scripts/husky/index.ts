import process from "node:process"
import { agent, log } from "@xtwis/ohstart-dev"
import argv from "./argv"
import { dlxCommand, runCommand } from "./scripts/command"
import { writeHooks } from "./scripts/hooks"
import { install } from "./scripts/install"
import { loadManifest } from "./scripts/manifest"
import { assertCommitlintConfig, assertGitRepository, assertScriptExists } from "./scripts/preflight"
import { findRoot } from "./scripts/root"

const { getArgv } = argv

export default async function main() {
  try {
    const { flags } = getArgv()
    const root = findRoot(process.cwd())

    if (!root)
      throw new Error("未找到 package.json, 请在项目目录内执行")

    if (!agent.name)
      throw new Error("未检测到包管理器, 请使用 --npm/--pnpm/--yarn 指定")

    const manifest = await loadManifest(root)

    assertGitRepository(root)
    if (flags.check)
      assertScriptExists(manifest, "check")
    if (flags.lint)
      assertScriptExists(manifest, "lint")
    if (flags.commit)
      assertCommitlintConfig(root)

    const commands: string[] = []
    if (flags.check)
      commands.push(runCommand(agent.name, "check"))
    if (flags.lint)
      commands.push(runCommand(agent.name, "lint"))

    const commitCommand = flags.commit
      ? dlxCommand(agent.name, "commitlint", "--edit $1")
      : undefined

    await install(root)
    await writeHooks(root, { commands, commitCommand })

    log.out(`已安装 husky 于 ${root}`)
  }
  catch (error) {
    log.error(error instanceof Error
      ? error.message
      : String(error))
    process.exitCode = 1
  }
}
