import type { Config } from "./type"

export function readme(config: Config): string {
  return `# ${config.name}\n`
}

export function nvmrc(config: Config): string {
  return `${config.node}\n`
}

export function packageJson(config: Config): string {
  const body = {
    name: config.name,
    version: "0.0.0",
    description: config.description,
    author: config.author,
    type: "module",
    packageManager: `pnpm@${config.pnpm}`,
    scripts: { check: "tsc --noEmit" },
  }
  return `${JSON.stringify(body, null, 2)}\n`
}
