import process from "node:process"
import { agent } from "@xtwis/ohstart-dev"

export async function install(root: string): Promise<void> {
  process.chdir(root)
  await agent.resolve("pnpm", "add", "-D", "typescript@^6")
}
