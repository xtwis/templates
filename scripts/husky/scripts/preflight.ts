import type { Manifest } from "../type"
import { existsSync } from "node:fs"
import { join } from "node:path"

const COMMITLINT_CONFIGS = [
  "commitlint.config.js",
  "commitlint.config.mjs",
  "commitlint.config.cjs",
  "commitlint.config.ts",
  ".commitlintrc",
  ".commitlintrc.json",
  ".commitlintrc.yaml",
  ".commitlintrc.yml",
]

export function assertGitRepository(root: string): void {
  if (!existsSync(join(root, ".git")))
    throw new Error("目标不是 git 仓库, 无法安装 husky")
}

export function assertScriptExists(manifest: Manifest, script: string): void {
  if (!manifest.scripts?.[script])
    throw new Error(`package.json 中不存在 ${script} 脚本`)
}

export function assertCommitlintConfig(root: string): void {
  if (!COMMITLINT_CONFIGS.some(file => existsSync(join(root, file))))
    throw new Error("未找到 commitlint 配置")
}
