import { exec } from 'child_process'

export const getCommand = (language: string, fileName: string) => {
  switch (language) {
    case 'javascript':
      return `node temp/${fileName}`
    case 'typescript':
      return `ts-node temp/${fileName}`
    case 'python':
      return `python3 temp/${fileName}`
    case 'java':
      return `java -cp temp ${fileName}`
    case 'c':
      return `gcc temp/${fileName} -o temp/${fileName}.out && temp/${fileName}.out`
    case 'cpp':
      return `g++ temp/${fileName} -o temp/${fileName}.out && temp/${fileName}.out`
    case 'csharp':
      return `mcs temp/${fileName} && mono temp/${fileName}.exe`
    case 'ruby':
      return `ruby temp/${fileName}`
    case 'swift':
      return `swift temp/${fileName}`
    case 'php':
      return `php temp/${fileName}`
    case 'kotlin':
      return `kotlinc temp/${fileName} -include-runtime -d temp/${fileName}.jar && java -jar temp/${fileName}.jar`
    case 'rust':
      return `rustc temp/${fileName} -o temp/${fileName}.out && temp/${fileName}.out`
    case 'scala':
      return `scalac temp/${fileName} && scala temp/${fileName}`
    case 'perl':
      return `perl temp/${fileName}`
    case 'r':
      return `Rscript temp/${fileName}`
    case 'haskell':
      return `runhaskell temp/${fileName}`
    case 'lua':
      return `lua temp/${fileName}`
    case 'elixir':
      return `elixir temp/${fileName}`
    case 'clojure':
      return `clojure temp/${fileName}`
    case 'dart':
      return `dart temp/${fileName}`
    case 'go':
      return `go run temp/${fileName}`
    default:
      return 'echo "Language not supported"'
  }
}

export const execFile = (command: string) => {
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      }
      resolve({ stdout, stderr })
    })
  })
}
