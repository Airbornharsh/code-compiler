import { RequestHandler } from 'express'
import { compileCode, getLanguage } from '../utils/code'
import fs from 'fs'
import { runCommand } from '../utils/execution'
import prettier from 'prettier'
import { v4 } from 'uuid'
import { Languages } from '../Types/Language'
import { execFile } from '../utils/commands'

export const compileHandler: RequestHandler = async (req, res) => {
  try {
    const { code, language } = req.body
    if (!fs.existsSync('temp')) {
      fs.mkdirSync('temp')
    }
    const result = await compileCode(code, language)
    return res.status(200).json({ result })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}

export const compileFileHandler: RequestHandler = async (req, res) => {
  try {
    const { path, filename } = req.file!
    const extension = path.split('.').pop()
    const language = getLanguage(extension!)
    const code = fs.readFileSync(path, 'utf-8')

    fs.writeFileSync(path, code)

    const result = await runCommand(language, filename)

    fs.unlinkSync(path)
    return res.status(200).json({ result })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}

export const prettierHandler: RequestHandler = async (req, res) => {
  try {
    const { code, language } = req.body
    const uuid = v4()
    const extension = Languages[language]
    const fileName = `${uuid}.${extension}`
    const filePath = `temp/${fileName}`
    fs.writeFileSync(filePath, code)

    await execFile(`cd temp && prettier --write ${fileName} && cd ..`)
    const formattedCode = fs.readFileSync(filePath, 'utf-8')
    fs.unlinkSync(filePath)
    return res.status(200).json({ formattedCode })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}