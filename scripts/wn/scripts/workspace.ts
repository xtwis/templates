import { execFile } from "node:child_process"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { promisify } from "node:util"

const execFileAsync = promisify(execFile)

const EXCLUDE_HEADER = "# whatsnext"
const EXCLUDE_ENTRY = ".whatsnext/"

export async function setupWorkspace(root: string): Promise<void> {
  const exclude = await resolveExclude(root)

  await mkdir(join(root, ".whatsnext", "tasks"), { recursive: true })
  await mkdir(join(root, ".whatsnext", "knowledge"), { recursive: true })
  await ensureExclude(exclude)
}

async function resolveExclude(root: string): Promise<string> {
  try {
    const { stdout } = await execFileAsync("git", ["rev-parse", "--git-path", "info/exclude"], { cwd: root })
    return resolve(root, stdout.trim())
  }
  catch {
    throw new Error("目标不是 git 仓库, 无法写入 .git/info/exclude")
  }
}

async function ensureExclude(file: string): Promise<void> {
  const current = await readFile(file, "utf8").catch(() => "")
  if (current.split(/\r?\n/).some(line => line.trim() === EXCLUDE_ENTRY))
    return
  const prefix = current === "" || current.endsWith("\n")
    ? current
    : `${current}\n`
  await writeFile(file, `${prefix}${EXCLUDE_HEADER}\n${EXCLUDE_ENTRY}\n`, "utf8")
}
