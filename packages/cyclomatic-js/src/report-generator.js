import {readdir, writeFile} from 'fs/promises'
import {calculateComplexity} from './calculate-complexity.js'

async function getSourceFile(folder, includedType, excludedType) {
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
export async function generateComplexityReport(sha, actor, workingDirectory) {
  const include = /\.js$/
  const exclude = /\__mocks__|.test.js|Test.js/
  const sourceFiles = await getSourceFile(workingDirectory, include, exclude)
  const analyzedFiles = await Promise.all(
    sourceFiles.map(async file => {
      try {
        return {
          file,
          report: await calculateComplexity(file)
        }
      } catch (e) {
        return {
          file,
          error:
            'failed to generate report for file, possible syntactical issue'
        }
      }
    })
  )
  const report = {
    sha,
    actor,
    workingDirectory,
    totalComplexity: 0,
    dateUtc: new Date().toUTCString()
  }
  const filename = `complexity-report-${new Date()}.json`;
  await writeFile(
    filename,
    JSON.stringify(report, undefined, 2)
  )
  return filename
}
