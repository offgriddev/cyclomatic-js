import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { calculateComplexity } from './index.js'

describe('CyclomaticJS', () => {
  it('simple-source', async () => {
    const complexity = await calculateComplexity('./examples/simple-source.js')
    assert.equal(complexity, 1)
  })

  it('common-js', async () => {
    const complexity = await calculateComplexity('./examples/common-js.js')
    assert.equal(complexity, 1)
  })

  it('conditionals', async () => {
    const complexity = await calculateComplexity('./examples/conditionals.js')
    assert.equal(complexity, 3)
  })

  it('dowhile', async () => {
    const complexity = await calculateComplexity('./examples/dowhile.js')
    assert.equal(complexity, 2)
  })

  it('for', async () => {
    const complexity = await calculateComplexity('./examples/for.js')
    assert.equal(complexity, 2)
  })

  it('forin', async () => {
    const complexity = await calculateComplexity('./examples/forin.js')
    assert.equal(complexity, 2)
  })

  it('forof', async () => {
    const complexity = await calculateComplexity('./examples/forof.js')
    assert.equal(complexity, 2)
  })

  it('switchcase', async () => {
    const complexity = await calculateComplexity('./examples/switchcase.js')
    assert.equal(complexity, 3)
  })

  it('try-catch', async () => {
    const complexity = await calculateComplexity('./examples/try-catch.js')
    assert.equal(complexity, 2)
  })

  it('while', async () => {
    const complexity = await calculateComplexity('./examples/while.js')
    assert.equal(complexity, 2)
  })

  it('logical-expression', async () => {
    const complexity = await calculateComplexity('./examples/logical-expression.js')
    assert.equal(complexity, 3)
  })
})