import { defineArgv } from "@xtwis/ohstart-dev"

export default defineArgv({
  flags: {
    fix: { type: "boolean", description: "安装后执行 fix" },
    force: { type: "boolean", description: "覆盖已存在的文件" },
  },
})
