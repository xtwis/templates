export interface Config {
  root: string
  check: boolean
  lint: boolean
  commit: boolean
}

export interface Manifest {
  name?: string
  version?: string
  type?: string
  scripts?: Record<string, string>
  devDependencies?: Record<string, string>
  [key: string]: unknown
}
