import { defineArgv } from "@xtwis/ohstart-dev"

export default defineArgv({
  flags: {
    check: { type: "boolean", description: "提交前执行 check" },
    lint: { type: "boolean", description: "提交前执行 lint" },
    commit: { type: "boolean", description: "提交信息校验 commitlint" },
  },
})
