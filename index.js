import { readFile } from "fs/promises";
import ast from "abstract-syntax-tree";

// minimal evaluation path of boolean values
const potentialValues = [
  [true, true],
  [true, false],
  [false, true],
  [false, false],
];

function buildTruthTable(symbol) {
  // symbol: ||, &&
  // take the number of boolean values
  const result = [];
  const possibleValues = variableNum;
  // cycle through possible values for p and q
  // log each set of values to avoid duplicates
  // add a record to result
  // determine possible combinations

  /**
   * take this example:
   * a || b && c || b
   *
   * assumption on steps
   * 1. a || b = z
   * 2. c || b = y
   * 3. z && y
   */

  for (let i = 0; i < possibleValues; i++) {}
  result.push({
    p: true,
    o: "&&",
    q: false,
    r: false,
  });
}

const calculateLogicalComplexityMultiplier = () => {
  // generate a truth table for the logical operation
  // assumption -> all nodes in a logical expression
  // will reduce to a true / false
  // the multiplier is the amount of rows in a logical expression's truth table
  // each row represents a different test case required to test
  return 1;
};

const typesAddingComplexity = [
  "IfStatement",
  "TryStatement",
  "CatchClause",
  "DoWhileStatement",
  "ForInStatement",
  "ForOfStatement",
  "ForStatement",
  "SwitchStatement",
  "BinaryExpression",
  //  "SwitchCase",
  "WhileStatement",
  "ConditionalExpression",
];

function increasesComplexity(node) {
  if (typesAddingComplexity.includes(node.type)) {
    return [true, 1];
  }

  if (
    node.type === "LogicalExpression" &&
    (node.operator === "||" || node.operator === "&&" || node.operator === "??")
  ) {
    return [true, calculateLogicalComplexityMultiplier(node)];
  }

  return [false, 0];
}

const resolveBody = {
  CatchClause: (node) => [node.handler.body.body],
  TryStatement: (node) => [node?.block?.body, node.handler.body.body],
  TryStatementHandler: (node) => [],
  LogicalExpression: (node) => [[node.left], [node.right]],
  ForStatement: (node) => [],
  ForOfStatement: (node) => [],
  ForInStatement: (node) => [],
  SwitchStatement: (node) => [],
  WhileStatement: (node) => [],
  BinaryExpression: (node) => [],
  IfStatement: (node) => [
    [node.test],
    node?.consequent?.body,
    node?.alternate?.body,
  ],
  FunctionDeclaration: (node) => [node.body],
  DoWhileStatement: (node) => [],
  BlockStatement: (node) => [node.body],
  VariableDeclaration: (node) => [node.declarations],
  VariableDeclarator: (node) => [[node.init]],
  ConditionalExpression: (node) => [
    [node.test],
    [node.consequent],
    [node.alternate],
  ],
};
function determineLogicalComplexity(bodyInput) {
  let complexity = 1; // default to complexity of one because every function has at minimal one path through
  function processNodes(body) {
    for (const node of body) {
      if (node.type === "ExportNamedDeclaration") {
        complexity = 1; // reset clock on each function
        console.log(node);
        console.log(`export name: ${node.id.lk}`);
        if (node.declaration.type === "FunctionDeclaration") {
          processNodes([node.declaration.body]);
        } else {
          findDeclarations(node.declaration);
        }
      }
      const resolvedBody = resolveBody[node.type];
      if (!resolvedBody) continue;
      const [shouldIncrease] = increasesComplexity(node);
      if (shouldIncrease) {
        console.log("increasing", node);
        complexity++;
      }
      const nodeBody = resolvedBody(node);
      if (nodeBody) {
        for (const nb of nodeBody) {
          if (!nb) continue;
          processNodes(nb);
        }
      }
    }
  }
  function findDeclarations(node, complexity) {
    console.log(node);
    if (node.declaration) return processNodes([node.declaration]);
    if (!node.declarations) return;

    for (const declaration of node.declarations) {
      console.log();
      const isFunction = !!declaration.init?.body?.body;
      console.log(`declaration name: ${declaration.id.name} - ${isFunction}`);
      if (declaration.init?.body?.body) {
        processNodes(declaration.init.body.body);
      }
    }
  }
  processNodes(bodyInput);
  // if (node.type === "SwitchCase" || node.type === "SwitchStatement") {
  //   console.log(JSON.stringify(node, undefined, 2));
  // }

  // if (node.handler?.type === "CatchClause") {
  //   complexity++;
  //   determineLogicalComplexity(node.handler.body.body, complexity);
  // }

  // if (node.type === "TryStatement") {
  //   determineLogicalComplexity(node.block.body, complexity);
  //   determineLogicalComplexity([node.handler?.body?.body]);
  // }

  // if (node.type === "LogicalExpression") {
  //   determineLogicalComplexity([node.left], complexity);
  //   determineLogicalComplexity([node.right], complexity);

  //   if (node.operator === "||" || node.operator === "&&") {
  //     complexity++;
  //   }
  // }

  // if (node.type === "IfStatement") {
  //   determineLogicalComplexity([node.test], complexity);
  //   // consequent and alternate are BlockStatement nodes
  //   determineLogicalComplexity(node.consequent.body, complexity);
  //   if (node?.alternate?.body) {
  //     complexity++;
  //     determineLogicalComplexity(node.alternate.body, complexity);
  //   }
  // }
  return complexity;
}

function calculateComplexity(tree) {
  const complexity = determineLogicalComplexity(tree.body);
  console.log(complexity);
}
console.log(process.argv[2]);
const file = await readFile(process.argv[2], "utf-8");
const tree = ast.parse(file);
calculateComplexity(tree);
// const result = calculateComplexity(tree);
// console.log(JSON.stringify(tree, undefined, 2));
