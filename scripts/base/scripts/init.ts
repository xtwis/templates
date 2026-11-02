import { execFile } from "node:child_process"
import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { promisify } from "node:util"

const execFileAsync = promisify(execFile)

const GITIGNORE = new URL("./assets/.gitignore.txt", import.meta.url)

export async function initGit(root: string): Promise<void> {
  await execFileAsync("git", ["init", "--quiet", "--initial-branch=main"], { cwd: root })
  await writeFile(join(root, ".gitignore"), await readFile(GITIGNORE, "utf8"))
}
