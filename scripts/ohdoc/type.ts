export interface Config {
  root: string
  src: string
  title: string
  repo?: string
}

export interface Manifest {
  name?: string
  version?: string
  type?: string
  repository?: string | { type?: string, url?: string }
  scripts?: Record<string, string>
  devDependencies?: Record<string, string>
  [key: string]: unknown
}
