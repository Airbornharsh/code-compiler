import e, { RequestHandler } from 'express'
import { compileCode, getLanguage } from '../utils/code'
import fs from 'fs'
import { runCommand } from '../utils/execution'
import { v4 } from 'uuid'
import { Languages } from '../Types/Language'
import prettier from 'prettier'
// import { execFile } from '../utils/commands'

export const compileHandler: RequestHandler = async (req, res) => {
  try {
    const { code, language } = req.body
    if (!fs.existsSync('temp')) {
      fs.mkdirSync('temp')
    }
    const { result, error } = (await compileCode(code, language))!
    if (error) {
      return res.status(200).json({ error, result: '' })
    } else {
      return res.status(200).json({ error: '', result })
    }
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

    const { result, error } = await runCommand(language, filename)

    fs.unlinkSync(path)
    if (error) {
      return res.status(200).json({ error, result: '' })
    } else {
      return res.status(200).json({ error: '', result })
    }
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}

export const prettierHandler: RequestHandler = async (req, res) => {
  try {
    const { code, language } = req.body
    if (!fs.existsSync('temp')) {
      fs.mkdirSync('temp')
    }
    const uuid = v4()
    const extension = Languages[language]
    const fileName = `${uuid}.${extension}`
    const filePath = `temp/${fileName}`
    // fs.writeFileSync(filePath, code)

    // await execFile(`cd temp && prettier --write ${fileName} && cd ..`)
    const formattedContent = await prettier.format(code, {
      // Add any Prettier configuration options here
      // For example, you can specify the parser for a specific language
      // parser: 'babel',
      parser: language === 'javascript' ? 'babel' : language,
    })
    // const formattedCode = fs.readFileSync(filePath, 'utf-8')
    // fs.unlinkSync(filePath)
    return res.status(200).json({ formattedCode: formattedContent })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}
