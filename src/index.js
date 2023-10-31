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
  'BinaryExpression',
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
  LogicalExpression: node => [[node.left], [node.right]],
  ForStatement: node => [node.body],
  ForOfStatement: node => [node.body],
  ForInStatement: node => [node.body],
  SwitchStatement: node => [node.cases],
  SwitchCase: node => [node.body],
  WhileStatement: node => [],
  BinaryExpression: node => [],
  IfStatement: node => [
    [node.test],
    node?.consequent?.body,
    node?.alternate?.body
  ],
  FunctionDeclaration: node => [node.body],
  DoWhileStatement: node => [],
  BlockStatement: node => [node.body],
  VariableDeclaration: node => [node.declarations],
  VariableDeclarator: node => [[node.init]],
  ConditionalExpression: node => [
    [node.test],
    [node.consequent],
    [node.alternate]
  ]
}
function determineLogicalComplexity(bodyInput) {
  let complexity = 1 // default to complexity of one because every function has at minimal one path through
  function processNodes(body) {
    for (const node of body) {
      if (node.type === 'ExportNamedDeclaration') {
        complexity = 1 // reset clock on each function
        if (node.declaration.type === 'FunctionDeclaration') {
          processNodes([node.declaration.body])
        } else {
          findDeclarations(node.declaration)
        }
      }
      const resolvedBody = resolveBody[node.type]
      console.log(node)
      if (!resolvedBody) continue
      const [shouldIncrease] = increasesComplexity(node)
      if (shouldIncrease) {
        complexity++
      }
      const nodeBody = resolvedBody(node)
      if (nodeBody) {
        for (const nb of nodeBody) {
          if (!nb) continue
          processNodes(nb)
        }
      }
    }
  }
  function findDeclarations(node, complexity) {
    if (node.declaration) return processNodes([node.declaration])
    if (!node.declarations) return

    for (const declaration of node.declarations) {
      const isFunction = !!declaration.init?.body?.body
      if (declaration.init?.body?.body) {
        processNodes(declaration.init.body.body)
      }
    }
  }
  processNodes(bodyInput)

  return complexity
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
