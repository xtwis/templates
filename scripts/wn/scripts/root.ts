import { existsSync } from "node:fs"
import { dirname, join, resolve } from "node:path"

export function findRoot(start: string): string | undefined {
  let current = resolve(start)
  while (true) {
    if (existsSync(join(current, "package.json")))
      return current
    const parent = dirname(current)
    if (parent === current)
      return
    current = parent
  }
}
