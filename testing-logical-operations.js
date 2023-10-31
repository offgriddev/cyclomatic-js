export function testingLogicalOperations() {
  const a = true;
  const b = false;
  const inline = a || b ? true : false;
  return inline;
}

export function testingOperators() {
  const a = true || false;
  const b = false ?? true;
  const c = false && true;
}
