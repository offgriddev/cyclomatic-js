import {readdir} from 'fs/promises'
import {calculateComplexity} from './calculate-complexity.js'

export async function getSourceFile(folder, includedType, excludedType) {
  let filePaths = []
  // get contents for folder
  const paths = await readdir(folder, {withFileTypes: true})
  // check if item is a directory

  for (const path of paths) {
    const filePath = `${folder}/${path.name}`

    if (path.isDirectory()) {
      if (path.name.match(/.*node_modules.*|.git|.github/)) continue

      const recursePaths = await getSourceFile(
        `${folder}/${path.name}`,
        includedType,
        excludedType
      )
      filePaths = filePaths.concat(recursePaths)
    } else {
      if (filePath.match(includedType) && !filePath.match(excludedType))
        filePaths.push(filePath)
    }
  }
  return filePaths
}

export async function generateComplexityReport(directory) {
  /**
   * Find all files in a subfolder
   * find all javascript
   */
  const include = /\.js$/
  const exclude = /\__mocks__|.test.js|Test.js/
  const sourceFiles = await getSourceFile(directory, include, exclude)
  const analyzedFiles = await Promise.all(
    sourceFiles.map(async file => ({
      file,
      report: await calculateComplexity(file)
    }))
  )
  console.log(JSON.stringify(analyzedFiles, undefined, 2))
}
