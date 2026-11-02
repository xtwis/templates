import { defineArgv } from "@xtwis/ohstart-dev"

export default defineArgv({
  args: [
    { name: "dir", description: "仓库创建目录" },
    { name: "name", description: "仓库名" },
  ],
  flags: {
    author: { type: "string", description: "仓库作者" },
    description: { type: "string", description: "仓库描述" },
    commit: { type: "boolean", description: "初始化后是否提交" },
    pnpm: { type: "string", description: "pnpm 版本" },
    node: { type: "string", description: "node 版本" },
  },
})
