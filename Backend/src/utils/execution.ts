import { execFile, getCommand } from './commands'

export const runCommand = async (language: string, fileName: string) => {
  try {
    const command = getCommand(language, fileName)
    const { stdout, stderr } = await execFile(command)
    return stdout || stderr
  } catch (err) {
    console.error(err)
  }
}
