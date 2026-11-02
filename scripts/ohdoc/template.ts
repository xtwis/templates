import type { Config } from "./type"

export function ohdocConfig(config: Config): string {
  const body = {
    src: config.src,
    title: config.title,
    ...(config.repo === undefined
      ? {}
      : { repo: config.repo }),
  }
  return `// ohdoc configuration file. see: https://x.twis.uk/en/ohdoc/guide/configuration.html
import { defineOhDocConfig } from "@xtwis/ohdoc"

export default defineOhDocConfig(${JSON.stringify(body, null, 2)})
`
}
