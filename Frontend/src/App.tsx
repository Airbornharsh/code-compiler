import { useState } from 'react'
import { Compiler, Languages } from './Utils/code'
const compiler = new Compiler()

const App = () => {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState(Languages.JAVASCRIPT)
  const [output, setOutput] = useState('Output will be shown here')

  const compileCode = async () => {
    try {
      console.log(language)
      const data = await compiler.compileCode(code, language)

      setOutput(data.result)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="h-[95%] w-[95%] bg-gray-800 rounded-md text-white">
        <div className="h-10 flex justify-between items-center text-sm px-2">
          <h2>Code Editor</h2>
          <div className="flex items-center justify-center gap-2">
            <p
              className="cursor-pointer"
              onClick={() => {
                compileCode()
              }}
            >
              run
            </p>
            <select
              className="bg-black text-white p-2 rounded-md outline-none"
              value={language}
              onChange={(e) => {
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
        <div className="h-[calc(100%-2.5rem)]">
          <textarea
            className="w-full h-[70%] bg-black text-white p-3 text-sm rounded-md outline-none"
            placeholder="Enter your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
          <p className="w-full h-[30%] bg-slate-900 text-white p-3 text-sm rounded-md outline-none">
            {output}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
