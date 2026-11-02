import { defineArgv } from "@xtwis/ohstart-dev"

export default defineArgv({
  flags: {
    force: { type: "boolean", description: "覆盖已存在的文件" },
  },
})
