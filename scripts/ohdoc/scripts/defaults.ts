import type argv from "../argv"
import type { Config, Manifest } from "../type"

type Argv = ReturnType<typeof argv.getArgv>

const DEFAULT_SRC = "docs"
const DEFAULT_TITLE = "Documentation"

export async function resolveConfig({ flags }: Argv, root: string, manifest: Manifest): Promise<Config> {
  return {
    root,
    src: flags.src ?? DEFAULT_SRC,
    title: flags.title ?? manifest.name ?? DEFAULT_TITLE,
    repo: flags.repo ?? resolveRepo(manifest.repository),
  }
}

function resolveRepo(repository: Manifest["repository"]): string | undefined {
  if (typeof repository === "string")
    return parseRepo(repository)
  if (repository && typeof repository === "object" && typeof repository.url === "string")
    return parseRepo(repository.url)
  return undefined
}

function parseRepo(value: string): string | undefined {
  const cleaned = value
    .trim()
    .replace(/^git\+/, "")
    .replace(/^github:/, "")
    .replace(/\.git$/, "")
  const match = cleaned.match(/([^/:]+)\/([^/]+)$/)
  return match === null
    ? undefined
    : `${match[1]}/${match[2]}`
}
