import process from "node:process"
import { agent } from "@xtwis/ohstart-dev"

export async function install(root: string): Promise<void> {
  process.chdir(root)
  await agent.add(["@antfu/eslint-config", "eslint", "eslint-plugin-format"], { dev: true })
}
