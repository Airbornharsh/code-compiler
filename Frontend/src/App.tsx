import { useRef, useState } from 'react'
import { Compiler, Languages } from './Utils/code'
import { FaPlay } from 'react-icons/fa'
import CodeEditor from '@uiw/react-textarea-code-editor'
import {
  findCharacterDifferences,
  getShortcut,
  insertCharacterAtIndex,
} from './Utils/editor'
const compiler = new Compiler()

const App = () => {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState(Languages.JAVASCRIPT)
  const [shortcut, setShortcut] = useState('js')
  const [output, setOutput] = useState('Output will be shown here')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  const compileCode = async () => {
    try {
      setError('')
      setIsLoading(true)
      const data = await compiler.compileCode(code, language)

      setOutput(data.result)
      setError(data.error ? 'Error' : '')
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const codePrettify = async () => {
    try {
      setError('')
      setIsLoading(true)
      const data = await compiler.prettier(code, language)

      setCode(data.formattedCode)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <div className="h-[95%] w-[95%] bg-gray-800 rounded-md text-white">
        <div className="h-10 flex justify-between items-center text-sm px-2">
          <h2>Code Editor</h2>
          <div className="flex items-center justify-center gap-2">
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              <FaPlay
                className="cursor-pointer"
                onClick={() => {
                  compileCode()
                }}
              />
            )}
            {language === Languages.JAVASCRIPT ? (
              <p
                className="mx-1 px-1 font-medium"
                onClick={() => {
                  codePrettify()
                }}
              >
                Prettify
              </p>
            ) : null}
            <select
              className="bg-black text-white p-2 rounded-md outline-none"
              value={language}
              onChange={(e) => {
                setShortcut(getShortcut(e.target.value.toLowerCase()))
                setLanguage(e.target.value as Languages)
              }}
            >
              {Object.keys(Languages).map((lang, index) => (
                <option key={index} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="h-[calc(100%-2.5rem)] relative">
          {/* <textarea
            className="w-full h-[70%] bg-black text-white p-3 text-sm rounded-md outline-none absolute top-0 bottom-0 left-0 right-0 z-10 opacity-0 cursor-text"
            placeholder="Enter your code here..."
            value={code}
            ref={inputRef}
            onChange={(e) => {
              const diff = findCharacterDifferences(code, e.target.value)[0]
              if (diff.currentChar === '{') {
                const newCode = insertCharacterAtIndex(
                  e.target.value,
                  diff.index + 1,
                  '}'
                )
                setCode(newCode)
              } else {
                setCode(e.target.value)
              }
            }}
          /> */}
          <CodeEditor
            value={code}
            language={shortcut}
            ref={inputRef}
            placeholder="Please enter code."
            onChange={(e) => {
              const diff = findCharacterDifferences(code, e.target.value)[0]
              // if (diff.index !== e.target.value.length - 1) {
              //   setCode(e.target.value)
              //   return
              // }
              if (e.target.value.length === diff.index + 1) {
                if (diff.currentChar === '{') {
                  const newCode = insertCharacterAtIndex(
                    e.target.value,
                    diff.index + 1,
                    '}'
                  )
                  setCode(newCode)
                } else if (diff.currentChar === '(') {
                  const newCode = insertCharacterAtIndex(
                    e.target.value,
                    diff.index + 1,
                    ')'
                  )
                  setCode(newCode)
                } else if (diff.currentChar === '[') {
                  const newCode = insertCharacterAtIndex(
                    e.target.value,
                    diff.index + 1,
                    ']'
                  )
                  setCode(newCode)
                } else if (diff.currentChar === "'") {
                  const newCode = insertCharacterAtIndex(
                    e.target.value,
                    diff.index + 1,
                    "'"
                  )
                  setCode(newCode)
                } else if (diff.currentChar === '"') {
                  const newCode = insertCharacterAtIndex(
                    e.target.value,
                    diff.index + 1,
                    '"'
                  )
                  setCode(newCode)
                } else if (diff.currentChar === '`') {
                  const newCode = insertCharacterAtIndex(
                    e.target.value,
                    diff.index + 1,
                    '`'
                  )
                  setCode(newCode)
                } else {
                  setCode(e.target.value)
                }
                return
              }
              setCode(e.target.value)
            }}
            padding={15}
            className="w-full h-[70%] bg-black text-white p-3 text-sm rounded-md outline-none"
            style={{
              fontFamily:
                'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          />
          {!error ? (
            <p className="w-full h-[30%] bg-slate-900 text-white p-3 text-sm rounded-md outline-none">
              {output}
            </p>
          ) : (
            <p className="w-full h-[30%] bg-slate-900 text-red-500 p-3 text-sm rounded-md outline-none">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
