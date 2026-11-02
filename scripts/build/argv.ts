import { defineArgv } from "@xtwis/ohstart-dev"

export default defineArgv({
  flags: {
    entry: { type: "string", description: "入口文件" },
    minify: { type: "boolean", description: "压缩产物" },
    sourcemap: { type: "boolean", description: "生成 sourcemap" },
    force: { type: "boolean", description: "覆盖已存在的文件" },
  },
})
