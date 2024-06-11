import { exec } from 'child_process'

export const getCommand = (language: string, fileName: string) => {
  switch (language) {
    case 'javascript':
      return `node ${fileName}`
    case 'typescript':
      return `ts-node ${fileName}`
    case 'python':
      return `python3 ${fileName}`
    case 'java':
      return `javac ${fileName} && java ${fileName.split('.')[0]} && rm ${fileName.split('.')[0]}.class`
    case 'c':
      return `gcc ${fileName} -o ${fileName}.out && ./${fileName}.out && rm ./${fileName}.out`
    case 'cpp':
      return `g++ ${fileName} -o ${fileName}out && ./${fileName}out && rm ./${fileName}out`
    case 'csharp':
      return `mcs ${fileName} && mono ${fileName}.exe && rm ${fileName}.exe`
    case 'ruby':
      return `ruby ${fileName}`
    case 'swift':
      return `swift ${fileName}`
    case 'php':
      return `php ${fileName}`
    case 'kotlin':
      return `kotlinc ${fileName} -include-runtime -d ${fileName}.jar && java -jar ${fileName}.jar && rm ${fileName}.jar`
    case 'rust':
      return `rustc ${fileName} && ./${fileName} && rm ${fileName}`
    case 'scala':
      return `scalac ${fileName} && scala ${fileName}`
    case 'perl':
      return `perl ${fileName}`
    case 'r':
      return `Rscript ${fileName}`
    case 'haskell':
      return `runhaskell ${fileName}`
    case 'lua':
      return `lua ${fileName}`
    case 'elixir':
      return `elixir ${fileName}`
    case 'clojure':
      return `clojure ${fileName}`
    case 'dart':
      return `dart ${fileName}`
    case 'go':
      return `go run ${fileName}`
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
