import { execFile, getCommand } from './commands'

export const runCommand = async (language: string, fileName: string) => {
  try {
    const command = getCommand(language, fileName)
    const fullCommand = `cd /app/temp && ${command}`
    const { stdout, stderr } = await execFile(
      `docker exec -i backend-compiler-1 sh -c "${fullCommand}"`
    )
    return {
      error: stderr,
      result: stdout,
    }
  } catch (err: any) {
    return {
      error: err.message,
      result: '',
    }
  }
}
