function nonExportedFunctionWithComplexity() {
  if (true) {}
}

function commonJS() {
  nonExportedFunctionWithComplexity()
  return true
}

module.exports = {commonJS}

// 2
