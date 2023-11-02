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

/**
 * This report leverages calculateComplexity to produce a complexity report recursively for an entire
 * project directory
 * @param {string} directory a given directory to analyze
 */
export async function generateComplexityReport(directory) {
  const include = /\.js$/
  const exclude = /\__mocks__|.test.js|Test.js/
  const sourceFiles = await getSourceFile(directory, include, exclude)
  const analyzedFiles = await Promise.all(
    sourceFiles.map(async file => ({
      file,
      report: await calculateComplexity(file)
    }))
  )
  await writeFile(
    'complexity-report.json',
    JSON.stringify(analyzedFiles, undefined, 2)
  )
}
