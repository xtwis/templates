import type { AgentName } from "@xtwis/ohstart-dev"

export function runCommand(agent: AgentName, script: string): string {
  if (agent === "npm")
    return `npm run ${script}`
  if (agent === "yarn")
    return `yarn ${script}`
  return `pnpm ${script}`
}

export function dlxCommand(agent: AgentName, name: string, args: string): string {
  if (agent === "npm")
    return `npx ${name} ${args}`
  return `${agent} dlx ${name} ${args}`
}
