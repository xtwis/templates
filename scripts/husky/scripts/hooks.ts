import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { commitMsg, preCommit } from "../template"

export interface HookOptions {
  commands: string[]
  commitCommand?: string
}

export async function writeHooks(root: string, options: HookOptions): Promise<void> {
  const dir = join(root, ".husky")
  await mkdir(dir, { recursive: true })

  await writeFile(join(dir, "pre-commit"), preCommit(options.commands), "utf8")

  if (options.commitCommand !== undefined)
    await writeFile(join(dir, "commit-msg"), commitMsg(options.commitCommand), "utf8")
}
