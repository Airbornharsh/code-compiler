export const findCharacterDifferences = (
  previousText: string,
  currentText: string
) => {
  const maxLength = Math.max(previousText.length, currentText.length)
  const differences: {
    index: number
    previousChar: string
    currentChar: string
  }[] = []

  for (let i = 0; i < maxLength; i++) {
    if (previousText[i] !== currentText[i]) {
      differences.push({
        index: i,
        previousChar: previousText[i],
        currentChar: currentText[i],
      })
    }
  }

  return differences
}

export const insertCharacterAtIndex = (
  originalString: string,
  index: number,
  characterToInsert: string
) => {
  if (index < 0 || index > originalString.length) {
    console.error('Index out of bounds.')
    return originalString
  }

  const modifiedString =
    originalString.slice(0, index) +
    characterToInsert +
    originalString.slice(index)

  return modifiedString
}

export const getShortcut = (language: string) => {
  switch (language) {
    case 'javascript':
      return 'js'
    case 'python':
      return 'py'
    case 'go':
      return 'go'
    case 'java':
      return 'java'
    case 'c':
      return 'c'
    case 'cpp':
      return 'cpp'
    default:
      return 'javascript'
  }
}
