import { execFile } from "node:child_process"
import { promisify } from "node:util"

const execFileAsync = promisify(execFile)

export async function commit(root: string): Promise<void> {
  await execFileAsync("git", ["add", "--all"], { cwd: root })
  await execFileAsync("git", ["commit", "--message", "chore: init"], { cwd: root })
}
