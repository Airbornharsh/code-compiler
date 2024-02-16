import { v4 } from 'uuid'
import { Languages } from '../Types/Language'
import { runCommand } from './execution'
import fs from 'fs'

export const compileCode = async (code: string, language: string) => {
  try {
    const uuid = v4()
    const extension = Languages[language]
    const fileName = `${uuid}.${extension}`
    const filePath = `temp/${fileName}`

    fs.writeFileSync(filePath, code)

    const result = await runCommand(language, fileName)

    fs.unlinkSync(filePath)

    return result
  } catch (err) {
    console.error(err)
  }
}
