import {readFile} from 'fs/promises'
import ast from 'abstract-syntax-tree'

const typesAddingComplexity = [
  'IfStatement',
  'TryStatement',
  'CatchClause',
  'DoWhileStatement',
  'ForInStatement',
  'ForOfStatement',
  'ForStatement',
  'WhileStatement',
  'ConditionalExpression'
]

function increasesComplexity(node) {
  const checTypesAddingComplexity = typesAddingComplexity.includes(node.type)
  const checkCaseStatements =
    node.type === 'SwitchCase' && node.consequent?.length > 0
  const checkConditionals =
    node.type === 'LogicalExpression' &&
    (node.operator === '||' || node.operator === '&&' || node.operator === '??')

  if (checTypesAddingComplexity || checkCaseStatements || checkConditionals) {
    return [true, 1]
  }

  return [false, 0]
}

const resolveBody = {
  CatchClause: node => [node.handler.body.body],
  TryStatement: node => [node?.block?.body, node.handler.body.body],
  TryStatementHandler: node => [],
  LogicalExpression: node => [node.left, node.right],
  ForStatement: node => [node.body?.body],
  ForOfStatement: node => [node.body?.body],
  ForInStatement: node => [node.body?.body],
  SwitchStatement: node => node.cases,
  SwitchCase: node => [node.consequent],
  WhileStatement: node => [node.body?.body],
  IfStatement: node => [
    node.test,
    node?.consequent?.body,
    node?.alternate?.body
  ],
  FunctionDeclaration: node => [node.declaration.body?.body],
  DoWhileStatement: node => [node.body?.body],
  BlockStatement: node => [node.body],
  VariableDeclaration: node => node.declarations,
  VariableDeclarator: node => [node.init],
  ConditionalExpression: node => [
    [node.test],
    [node.consequent],
    [node.alternate]
  ],
  ArrowFunctionExpression: node => node.body.body,
  ExpressionStatement: node => node.expression.arguments,
  ExportNamedDeclaration: node => [node.declaration],
  ExportDefaultDeclaration: node => [node.declaration],
  ReturnStatement: node => [node.argument]
}

const getName = node => {
  return node.id.name
}

function determineLogicalComplexity(body) {
  let complexity = 0
  const output = {}
  body.forEach(function cb(node) {
    if (!node) return
    if (node.type === 'FunctionDeclaration' || (node.type === 'VariableDeclarator' && node.init.type === 'ArrowFunctionExpression')) {
      const old = complexity
      complexity = 1 // reset clock on each function
      if (node.type === 'FunctionDeclaration') {
        node.body.body.forEach(cb)
      }
      if (node.type === 'VariableDeclarator' && node.init.body.type === 'BlockStatement') {
        node.init.body.body.forEach(cb)
      }
      const name = getName(node)
      output[name] = complexity
      complexity = old
    } else {
      const resolvedBody = resolveBody[node.type]
      if (!resolvedBody) return
      const [shouldIncrease] = increasesComplexity(node)
      if (shouldIncrease) {
        complexity += 1
      }
      const nodeBody = resolvedBody(node)
      if (nodeBody) {
        nodeBody.forEach(cb)
      }
    }
  })

  return output
}

/**
 * Calculates the Cyclomatic Complexity of a given file.
 *
 * @param {string} filename
 * @returns {number} cyclomatic complexity
 */
export async function calculateComplexity(filename) {
  const file = await readFile(filename, 'utf-8')
  const tree = ast.parse(file)
  return determineLogicalComplexity(tree.body)
}
