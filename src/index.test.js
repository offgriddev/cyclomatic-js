import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { calculateComplexity } from './index.js'

describe('CyclomaticJS', () => {
  it('simple check', async () => {
    const complexity = await calculateComplexity('./src/simple-source.js')
    assert.equal(complexity, 1)
  })
})