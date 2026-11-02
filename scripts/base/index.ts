import process from "node:process"
import { log } from "@xtwis/ohstart-dev"
import argv from "./argv"
import { commit } from "./scripts/commit"
import { resolveConfig } from "./scripts/defaults"
import { writeFiles } from "./scripts/files"
import { initGit } from "./scripts/init"
import { install } from "./scripts/install"
import { isEmpty } from "./scripts/preflight"

const { getArgv } = argv

export default async function main() {
  try {
    const argv = getArgv()
    const config = await resolveConfig(argv)

    if (!isEmpty(config.root))
      throw new Error(`目录不为空: ${config.root}`)

    await initGit(config.root)
    await writeFiles(config.root, config)
    await install(config.root)

    if (argv.flags.commit)
      await commit(config.root)

    log.out(`初始化仓库 ${config.name} 于 ${config.root}`)
  }
  catch (error) {
    log.error(error instanceof Error
      ? error.message
      : String(error))
    process.exitCode = 1
  }
}
