import type argv from "../argv"
import type { Config } from "../type"

type Argv = ReturnType<typeof argv.getArgv>

const DEFAULT_ENTRY = "src/index.ts"
const DEFAULT_SRC_DIR = "src"
const DEFAULT_OUT_DIR = "dist"

export async function resolveConfig({ flags }: Argv, root: string): Promise<Config> {
  return {
    root,
    entry: flags.entry ?? DEFAULT_ENTRY,
    srcDir: DEFAULT_SRC_DIR,
    outDir: DEFAULT_OUT_DIR,
    minify: flags.minify,
    sourcemap: flags.sourcemap,
    force: flags.force,
  }
}
