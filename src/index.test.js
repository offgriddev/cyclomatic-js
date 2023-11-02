import {describe, it, beforeEach} from 'node:test'
import assert from 'node:assert/strict'
import {calculateComplexity} from './index.js'

describe('CyclomaticJS', () => {
  it('simple-source', async () => {
    const complexity = await calculateComplexity('./examples/simple-source.js')
    assert.deepEqual(complexity, {
      simpleSource: 1
    })
  })

  it('common-js', async () => {
    const complexity = await calculateComplexity('./examples/common-js.js')
    assert.deepEqual(complexity, {
      commonJS: 1
    })
  })

  it('conditionals', async () => {
    const complexity = await calculateComplexity('./examples/conditionals.js')
    assert.deepEqual(complexity, {
      conditionals: 3
    })
  })

  it('dowhile', async () => {
    const complexity = await calculateComplexity('./examples/dowhile.js')
    assert.deepEqual(complexity, {
      doWhile: 2
    })
  })

  it('for', async () => {
    const complexity = await calculateComplexity('./examples/for.js')
    assert.deepEqual(complexity, {
      _for: 2
    })
  })

  it('forin', async () => {
    const complexity = await calculateComplexity('./examples/forin.js')
    assert.deepEqual(complexity, {
      _forIn: 2
    })
  })

  it('forof', async () => {
    const complexity = await calculateComplexity('./examples/forof.js')
    assert.deepEqual(complexity, {
      _forOf: 2
    })
  })

  it('switchcase', async () => {
    const complexity = await calculateComplexity('./examples/switchcase.js')
    assert.deepEqual(complexity, {
      switchCase: 3
    })
  })

  it('try-catch', async () => {
    const complexity = await calculateComplexity('./examples/try-catch.js')
    assert.deepEqual(complexity, {
      tryCatch: 2
    })
  })

  it('while', async () => {
    const complexity = await calculateComplexity('./examples/while.js')
    assert.deepEqual(complexity, {
      _while: 2
    })
  })

  it('logical-expression', async () => {
    const complexity = await calculateComplexity(
      './examples/logical-expression.js'
    )
    assert.deepEqual(complexity, {
      logicalExpression: 3
    })
  })

  it('multi-export', async () => {
    const complexity = await calculateComplexity(
      './examples/multi-export.js'
    )
    assert.deepEqual(complexity, {
      exportOne: 1,
      exportTwo: 2
    })
  })

  it('lambda-conditional', async () => {
    const complexity = await calculateComplexity(
      './examples/lambda-conditional.js'
    )
    assert.deepEqual(complexity, {
      lambdaConditional: 2
    })
  })

  it('default-export', async () => {
    const complexity = await calculateComplexity(
      './examples/default-export.js'
    )
    assert.deepEqual(complexity, {
      test: 1
    })
  })
})
