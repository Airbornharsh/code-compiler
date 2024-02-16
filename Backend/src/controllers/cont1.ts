import { RequestHandler } from 'express'
import { compileCode } from '../utils/code'

export const compileHandler: RequestHandler = async (req, res) => {
  try {
    const { code, language } = req.body
    const result = await compileCode(code, language)
    return res.status(200).json({ result })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}
