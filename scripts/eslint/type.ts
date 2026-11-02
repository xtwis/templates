export interface Manifest {
  name?: string
  version?: string
  type?: string
  scripts?: Record<string, string>
  devDependencies?: Record<string, string>
  [key: string]: unknown
}
