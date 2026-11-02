export interface Config {
  root: string
  entry: string
  srcDir: string
  outDir: string
  minify: boolean
  sourcemap: boolean
  force: boolean
}

export interface Manifest {
  name?: string
  version?: string
  main?: string
  types?: string
  exports?: Record<string, unknown>
  files?: string[]
  scripts?: Record<string, string>
  devDependencies?: Record<string, string>
  [key: string]: unknown
}
