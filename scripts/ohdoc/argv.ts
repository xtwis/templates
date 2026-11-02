import { defineArgv } from "@xtwis/ohstart-dev"

export default defineArgv({
  flags: {
    src: { type: "string", description: "文档目录" },
    title: { type: "string", description: "站点标题" },
    repo: { type: "string", description: "仓库地址, owner/name" },
    force: { type: "boolean", description: "覆盖已存在的文件" },
  },
})
