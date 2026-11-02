import type argv from "../argv"
import type { Config } from "../type"
import { execFile } from "node:child_process"
import { basename, resolve } from "node:path"
import process from "node:process"
import { promisify } from "node:util"

const execFileAsync = promisify(execFile)

type Argv = ReturnType<typeof argv.getArgv>

const DEFAULT_PNPM = "11.24.0"
const DEFAULT_NODE = "22"

async function gitUserName(): Promise<string> {
  try {
    const { stdout } = await execFileAsync("git", ["config", "user.name"])
    return stdout.trim()
  }
  catch {
    return ""
  }
}

export async function resolveConfig({ args, flags }: Argv): Promise<Config> {
  const root = resolve(args[0] ?? process.cwd())
  return {
    root,
    name: args[1] ?? basename(root),
    author: flags.author ?? await gitUserName(),
    description: flags.description ?? "",
    pnpm: flags.pnpm ?? DEFAULT_PNPM,
    node: flags.node ?? DEFAULT_NODE,
  }
}
