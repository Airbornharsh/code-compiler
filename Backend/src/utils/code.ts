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

export const getLanguage = (extension: string) => {
  switch (extension) {
    case 'js':
      return 'javascript'
    case 'ts':
      return 'typescript'
    case 'py':
      return 'python'
    case 'java':
      return 'java'
    case 'c':
      return 'c'
    case 'cpp':
      return 'cpp'
    case 'cs':
      return 'csharp'
    case 'rb':
      return 'ruby'
    case 'swift':
      return 'swift'
    case 'php':
      return 'php'
    case 'kt':
      return 'kotlin'
    case 'rs':
      return 'rust'
    case 'scala':
      return 'scala'
    case 'pl':
      return 'perl'
    case 'r':
      return 'r'
    case 'hs':
      return 'haskell'
    case 'lua':
      return 'lua'
    case 'ex':
      return 'elixir'
    case 'clj':
      return 'clojure'
    case 'dart':
      return 'dart'
    case 'go':
      return 'go'
    default:
      return 'echo "Language not supported"'
  }
}