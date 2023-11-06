import * as core from '@actions/core'
import { generateComplexityReport } from 'cyclomatic-js';

async function run(){
  try {
    const sha = core.getInput('sha')
    const actor = core.getInput('actor')
    const workingDirectory = core.getInput('working_directory')
    const filename = generateComplexityReport(sha, actor, workingDirectory)

    core.setOutput('export_filename', filename)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
