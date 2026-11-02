import { existsSync } from "node:fs"
import { join } from "node:path"

export function assertNoConflicts(root: string, files: string[], force: boolean): void {
  if (force)
    return
  const conflicts = files.filter(file => existsSync(join(root, file)))
  if (conflicts.length > 0)
    throw new Error(`文件已存在: ${conflicts.join(", ")}`)
}
