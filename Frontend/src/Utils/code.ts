/* eslint-disable no-useless-catch */
import { COMPILER_BACKEND_URI } from './config'
import { Languages } from './languages'

class Compiler {
  constructor() {}

  async compileCode(code: string, language: Languages) {
    try {
      const data = await fetch(`${COMPILER_BACKEND_URI}/api/compile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language: language.toLowerCase() }),
      })

      const parsedData: {
        result: string
        error: string
      } = await data.json()

      return parsedData
    } catch (e) {
      throw e
    }
  }

  async compileFile(file: File) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('filename', file.name)
      formData.append('originalname', file.name)
      const data = await fetch(`${COMPILER_BACKEND_URI}/api/compile-file`, {
        method: 'POST',
        body: formData,
      })

      const parsedData: {
        result: string
        error: string
      } = await data.json()

      return parsedData
    } catch (e) {
      throw e
    }
  }

  async prettier(code: string, language: Languages) {
    try {
      const data = await fetch(`${COMPILER_BACKEND_URI}/api/prettier`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language: language.toLowerCase() }),
      })

      const parsedData: {
        formattedCode: string
      } = await data.json()

      if (parsedData.formattedCode) {
        return parsedData
      }
      return {
        formattedCode: code,
      }
    } catch (e) {
      throw e
    }
  }
}

export { Compiler, Languages }
