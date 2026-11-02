import process from "node:process"
import { agent } from "@xtwis/ohstart-dev"

export async function fix(root: string): Promise<void> {
  process.chdir(root)
  await agent.run("fix")
}
