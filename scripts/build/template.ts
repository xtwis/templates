import type { Config } from "./type"

export function tsdownConfig(config: Config): string {
  return `import { fileURLToPath } from "node:url"
import { defineConfig } from "tsdown"

export default defineConfig({
  entry: ["${config.entry}"],
  outDir: "${config.outDir}",
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  minify: ${config.minify},
  sourcemap: ${config.sourcemap},
  tsconfig: "tsconfig.build.json",
  alias: {
    "@": fileURLToPath(new URL("./${config.srcDir}", import.meta.url)),
  },
  exports: {
    packageJson: true,
  },
})
`
}

export function tsconfigBuild(config: Config): string {
  const body = {
    extends: "./tsconfig.json",
    compilerOptions: {
      noEmit: false,
      declaration: true,
      declarationMap: false,
      sourceMap: config.sourcemap,
      rootDir: `./${config.srcDir}`,
      outDir: `./${config.outDir}`,
    },
    include: [`${config.srcDir}/**/*`],
  }
  return `${JSON.stringify(body, null, 2)}\n`
}
