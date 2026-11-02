export function preCommit(commands: string[]): string {
  return commands.length > 0
    ? `${commands.join("\n")}\n`
    : ""
}

export function commitMsg(command: string): string {
  return `${command}\n`
}
