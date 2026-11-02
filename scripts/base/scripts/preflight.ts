import { mkdirSync, readdirSync } from "node:fs"

export function isEmpty(root: string): boolean {
  try {
    return readdirSync(root).length === 0
  }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      mkdirSync(root, { recursive: true })
      return true
    }
    throw error
  }
}
